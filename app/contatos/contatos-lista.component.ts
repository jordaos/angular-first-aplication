import { Component, OnInit } from '@angular/core';
import { Contato } from "./contatos.model";
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service'


@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: './contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {
    contatos: Contato[] = [];
    mensagem: {};
    classesCss: {};
    private currentTimeout: any;
    itsLoading = true;

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ){}

    ngOnInit(): void{
        this.contatoService.getContatosSlowly()
            .then((contatos: Contato[]) => {
                this.contatos = contatos;
                this.itsLoading = false;
            })
            .catch(err => {
                this.mostrarMensagem({
                    tipo: 'danger', 
                    texto: 'Ocorreu um erro ao buscar a lista de contatos.'
                });
                this.itsLoading = false;
            });
    }

    onDelete(contato: Contato): void{
        this.dialogService.confirm(`Deseja deletar ${contato.nome}?`)
            .then((canDelete: boolean) => {
                if(canDelete){
                    this.contatoService.delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
                            this.mostrarMensagem({
                                tipo: 'success', 
                                texto: 'Contato deletado.'
                            });
                        }).catch((err: Error) => {
                            this.mostrarMensagem({
                                tipo: 'danger', 
                                texto: 'Erro ao deletar contato.'
                            });
                        })
                }
            });
    }

    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void{
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if(mensagem.tipo !== 'danger'){
            if(this.currentTimeout)
                clearTimeout(this.currentTimeout);
            this.currentTimeout = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }
    private montarClasses(tipo: string): void{
        this.classesCss = {
            'alert': true
        };
        this.classesCss['alert-' + tipo] = true;
    }
}