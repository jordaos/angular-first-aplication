import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params }  from '@angular/router';

import{ Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject';

import { Contato } from './contatos.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer{
            cursor: pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {
    
    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<any> = new Subject<any>();
    
    constructor(
        private contatoService: ContatoService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        //let searchTerm = this.activatedRoute.snapshot.queryParams["term"];
        
        this.contatos = this.termosDaBusca
            .debounceTime(500) // aguardar 500ms para emitir novos eventos
            .distinctUntilChanged()// ignore se o próximo termo de busca for igual ao anterior. (ex: digita "carro" e depois "carro bon" mais apaga o " bon" antes de a busca retornar)
            .switchMap(term => {
                return term ? this.contatoService.search(term) : Observable.of<Contato[]>([]);
            })//caso sejam feitas muitas buscas (tipo digita "am" e depois "or" pra formar "amor") ele cancela a busca do "am" e busca só por "amor"
            .catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });
            /**
             * O "async" no ngFor faz algo semelhante a:
            this.contatos.subscribe((contatos: Contato[]) => {
                console.log('retornou ' , contatos);
            });
            */
    }

    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(term: string): void{
        this.termosDaBusca.next(term);
        this.buscaChange.emit(term);
    }

    verDetalhes(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}