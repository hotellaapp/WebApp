import {Servico} from './servico';

export interface Categoria {
    idCategoria: number;
    nome : string;
    tipoPagamento : string;
    estado : string;
    servicos : Servico[];
    id :number
}