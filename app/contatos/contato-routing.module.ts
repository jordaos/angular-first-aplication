import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ContatosListaComponent } from "./contatos-lista.component";
import { ContatoDetalheComponent } from "./contato-detalhe.component";
import { ContatoBuscaComponent } from './contato-busca.component';

const contatoRoutes: Routes = [
    {
        path: 'contato',
        component: ContatosListaComponent,
    },{
        path: 'contato/save',
        component: ContatoDetalheComponent
    },{
        path: 'contato/save/:id',
        component: ContatoDetalheComponent
    }, {
        path: 'contato/search',
        component: ContatoBuscaComponent
    }
    
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(contatoRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class ContatoRoutingModule {}