import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contato } from './contatos/contatos.model';

@Injectable()
export class InMemoryDataService implements InMemoryDbService{
    createDb(): {} {
        let contatos: Contato[] = [
            {id: 1, nome: 'contato 1', email: 'contato1@contato.com', telefone: '9999999999'},
            {id: 2, nome: 'contato 2', email: 'contato2@contato.com', telefone: '9999999999'},
            {id: 3, nome: 'contato 3', email: 'contato3@contato.com', telefone: '9999999999'},
            {id: 4, nome: 'contato 4', email: 'contato4@contato.com', telefone: '9999999999'},
        ];
        return {
            'contatos': contatos
        };
    }
}