import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ContatoService } from './contato.service';
import { Contato } from './contatos.model';



@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: './contato-detalhe.component.html'
})
export class ContatoDetalheComponent implements OnInit{
    contato: Contato;
    private isNew: boolean = true;
    
    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ){}

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return{
            'form-group': true,
            'has-danger': !isValid && !isPristine
        }
    }

    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
        return{
            'form-control': true,
            'form-control-danger': !isValid && !isPristine
        }
    }

    onSubmit(): void{
        let promise;
        if(this.isNew){
            promise = this.contatoService.create(this.contato);
        }else{
            promise = this.contatoService.update(this.contato);
        }
        promise.then(contato => this.goBack());
    }

    ngOnInit(): void{
        this.contato = new Contato('', '', '');// Precisa inicializar

        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];// + para converter em number
            if(id){
                this.isNew = false;
                this.contatoService.find(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                    })
            }
        });
    }

    goBack(): void{
        this.location.back();
    }
}