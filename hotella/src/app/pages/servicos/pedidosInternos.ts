import {Avaliacao} from './avaliacao';

export interface PedidosInternos {
    idPedido: number,
    data_fim: string,
    data_inicio : string,
    descricao : string,
    estado : number,
    preco :number,
    avaliacao: Avaliacao,
    idCliente: number,
    idServico : number,
    idUtilizador: number
   }