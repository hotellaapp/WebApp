import { Service } from '../showservices/servico';

export class Categoria {

    constructor(
        public idCategoria :number,
        public nome : string,
        public estado : string,
        public servicos : Service[]
    ){}



}