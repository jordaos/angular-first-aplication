"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
let InMemoryDataService = class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'contato 1', email: 'contato1@contato.com', telefone: '9999999999' },
            { id: 2, nome: 'contato 2', email: 'contato2@contato.com', telefone: '9999999999' },
            { id: 3, nome: 'contato 3', email: 'contato3@contato.com', telefone: '9999999999' },
            { id: 4, nome: 'contato 4', email: 'contato4@contato.com', telefone: '9999999999' },
        ];
        return {
            'contatos': contatos
        };
    }
};
InMemoryDataService = __decorate([
    core_1.Injectable()
], InMemoryDataService);
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map