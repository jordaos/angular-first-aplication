import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent{

    constructor(
        private router: Router
    ){}

    log(x: string): void{
        console.log(x);
    }

    /*buscar(termo: string): void {
        if(termo){
            let link = ['contato/search'];
            let params = {queryParams: {term: termo}};
            this.router.navigate(link, params);
        }
    }*/
}