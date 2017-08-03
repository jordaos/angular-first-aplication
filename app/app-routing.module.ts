import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/contato',
        pathMatch: 'full'
    }
]

@NgModule({
    declarations: [],
    imports: [ 
        RouterModule.forRoot(appRoutes) 
    ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class AppRoutingModule {}