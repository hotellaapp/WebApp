export class Json {
	firstName:string="firstName";
	requests:string="requests";
	services:string="services";
  comments:string="comments";
  
    mostrarServico : string = "mostrarServicos";
    editar : string ="editar";
    servicoCategoria : string="servicoCategoria";
    mensagemEditar : string ='Tem a certeza que deseja editar esta linha?';
    mensagemApagar : string ='Tem a certeza que deseja apagar esta linha?';
    nome : string ="nome";
    pedidosExternos : string ="pedidosexternos";
    nome_Cliente :string ="nome_cliente";
    preco : string ="preco";
    descricao :string ="descricao";
    dataFim : string="dataFim";
    dataInicio : string="dataInicio";
    pedido : string="pedidos";
    mensagemCriar:string ='Tem a certeza que deseja adicionar este serviço?';
    estado : string ="estado";
    ativo :string ="ativo";
    nomeCategoria : string ="nomeCategoria";
    apresentarServico : string="apresentarServicos";
    servicos : string ="servicos";
    desativado : string="Indisponível";
    mostrarCategorias : string ="mostrarCategorias";
    adicionarCategoria:string="adicionarCategoria";
    tipoPagamento:string ="tipoPagamento";
    criarCategoria:string="criarCategoria";
    tabela : string ="tabela";
    mostrar :string="mostar";
    restaurante :string="restaurante";
    inativo :string ="inativo";
    actualizar : string="actualizar";
    idCategoria:string="idCategoria";
    admin :string ="admin";
    idServico :string="idServico";
    desativarServico :string ="Tem a certeza que pretende desativar este serviço?";
    desativarCategoria :string ="Tem a certeza que pretende desativar esta categoria?";
    externo:string= "Externo";
    data:string ="data";
    regime:string="regime";
    tipo:string="tipo";
    editarCategoria:string ="Tem a certeza que pretende ativar esta categoria?";
    editarRestaurante:string="Tem a certeza que pretende editar o menu?"
    informacoes :string ="Informações";
    infoExterno :string ="Externo Informativo";
    mostrarEstado:string="mostrarEstado";
    quantidade:string ="quantidade";
    mostrarTabelaCategoria:string="mostrarTabelaCategoria";
    editarServico :string="editarServico";
    listaServicos:string="listaServicos";
    alterarServicos :string="alterarServicos";
    okBotao:string="okBotao";
    apresentarEstado:string="apresentarEstado";
    idMenu:string="id_menu";
    mostarEstadosMenu:string="mostrarEstadoMenu";
    mostrarTabelaMenu:string="mostrarTabelaMenu";
    criarMenu:string="Tem a certeza que pretende criar este menu?";
    editarMenu:string="Tem a certeza que pretende editar este menu?";
    apagarMenu:string="Tem a certeza que pretende desativar este menu?";
    criarCategoriaM :string="Tem a certeza que pretende criar esta categoria?";
    editarServicoM:string="Tem a certeza que pretende editar este servico?";
    dadoInvalidos :string="Verifique os dados";

    listaMenu :Array<any>=[ 

      {
        nome:this.ativo
      },

      {
        nome:this.desativado
      }

    ];


    listaCategorias :Array<any>=[
      {
        nome:this.ativo
      },

      {
        nome:this.inativo
      }

    ];


    listaDeEstados: Array<any> = [
      {
        nome:this.ativo
      },
      {
        nome:this.desativado
      },
      {
        nome:this.inativo
      },
      {
        nome:this.externo
      },
      {
        nome:this.informacoes
      },

      {
        nome:this.infoExterno
      },



    ];
   


    constructor() {}


    convertStringToNumber(data:string) :number {

        var estado=-1;

                if(data.trim()===this.ativo.trim()) {
                  estado=1;
                }
                if(data.trim()===this.desativado.trim()){
                  estado=0;
                }
  
                if(data.trim()===this.inativo.trim()){
                  estado=2;
                }

                if(data.trim()===this.externo.trim()){
                  estado=3;
                }
                
                if(data.trim()===this.informacoes.trim()){
                  estado=4;
                }

                if(data.trim()===this.infoExterno.trim()){
                  estado=5;
                }


                if(estado==-1) estado=2;

                return estado;
    
    }


    convertNumberToString(numero :number):string {
        var estado1="";
        if(numero==1) {
            estado1=this.ativo;
          } 
          if(numero==0){
            estado1=this.desativado;
          }

          if(numero==2){
            estado1=this.inativo;
          }

          if(numero==3) {
            estado1=this.externo;
          }

          if(numero==4) {
            estado1=this.informacoes;
          }

          if(numero==5) {
            estado1=this.infoExterno;
          }

          return estado1;
    }

    verificaString(str) {
      return (!str || /^\s*$/.test(str) || 0 === str.length);
    } 

    verificaNumero(numero) {
      var e=0;

      if (isNaN(numero) ||numero==='') e=1;
      
      return e;

    }


    transforma(elemento) {


      return "dd"+":"+elemento;

    }


}

