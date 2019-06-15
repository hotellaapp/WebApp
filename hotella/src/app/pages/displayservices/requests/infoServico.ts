export class InfoServico {
    constructor( public nome:string,
        public quantidade:number,
        public dataInicio: string,
        public dataFim: string,
        public descricao: string,
        public precoCliente  : number,
        public precoServico  :number
    ) {}
}