"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
const contato_service_1 = require("./contato.service");
let ContatoBuscaComponent = class ContatoBuscaComponent {
    constructor(contatoService, router, activatedRoute) {
        this.contatoService = contatoService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.buscaChange = new core_1.EventEmitter();
        this.termosDaBusca = new Subject_1.Subject();
    }
    ngOnInit() {
        //let searchTerm = this.activatedRoute.snapshot.queryParams["term"];
        this.contatos = this.termosDaBusca
            .debounceTime(500) // aguardar 500ms para emitir novos eventos
            .distinctUntilChanged() // ignore se o próximo termo de busca for igual ao anterior. (ex: digita "carro" e depois "carro bon" mais apaga o " bon" antes de a busca retornar)
            .switchMap(term => {
            return term ? this.contatoService.search(term) : Observable_1.Observable.of([]);
        }) //caso sejam feitas muitas buscas (tipo digita "am" e depois "or" pra formar "amor") ele cancela a busca do "am" e busca só por "amor"
            .catch(err => {
            console.log(err);
            return Observable_1.Observable.of([]);
        });
        /**
         * O "async" no ngFor faz algo semelhante a:
        this.contatos.subscribe((contatos: Contato[]) => {
            console.log('retornou ' , contatos);
        });
        */
    }
    ngOnChanges(changes) {
        let busca = changes['busca'];
        this.search(busca.currentValue);
    }
    search(term) {
        this.termosDaBusca.next(term);
        this.buscaChange.emit(term);
    }
    verDetalhes(contato) {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContatoBuscaComponent.prototype, "busca", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ContatoBuscaComponent.prototype, "buscaChange", void 0);
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato-busca.component.html',
        styles: [`
        .cursor-pointer{
            cursor: pointer;
        }
    `]
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.Router,
        router_1.ActivatedRoute])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map