import {Component,OnInit} from '@angular/core';
import {ServicoService} from './servicos.service';
import { Http } from '@angular/http';
import { Categoria } from './categoria';
import { LocalDataSource } from 'ng2-smart-table';
import {Servico} from './servico';
import {InfoServico} from './infoServico';
import {Json} from './json';


@Component({
  selector: 'servicos',
  templateUrl:'./servicos.html',
  styleUrls: ['./servicos.scss']
})
export class Servicos implements OnInit{

  servicos : Servico[];
  errorMessage: string; 
  tiposAccoes : Array<any>;
  tiposCategorias: Array<any>;
  info :InfoServico[];
  json: Json;
  source: LocalDataSource ;
  //valorEscolhido :string;

  constructor(private s:ServicoService) {
    this.tiposAccoes=s.getTiposAccoes();
    this.tiposCategorias=[];
    this.servicos=[];
    this.info=[];
    this.source=new LocalDataSource();
    this.json=new Json();
    
  }



  getServicos(){
    return this.s
    .getServicos()
    .map(
      (servicos) => {
        this.servicos = servicos;
      })
     .catch((error) => {
        throw error;
      });
  }

  ngOnInit(){
   var valor=-1;
   this.s.getTamanho().subscribe(data=>{valor=data
    
      if(valor>=1) {
        this.selectedValue=this.s.getTiposAccoes()[0];
        this.getServicos().subscribe(_ => {});
        this.onChange();
      }
    });
  }
 

  showNothing() {

    //document.getElementById(this.json.mostrarServico).style.display = 'none';
    document.getElementById(this.json.editar).style.display = 'none';
    document.getElementById(this.json.servicoCategoria).style.display = 'none';
    document.getElementById(this.json.apresentarServico).style.display='none';
    document.getElementById(this.json.adicionarCategoria).style.display='none';
    document.getElementById(this.json.restaurante).style.display='none';
    document.getElementById(this.json.mostrarEstado).style.display='none';
    document.getElementById(this.json.mostrarTabelaCategoria).style.display='none';
    document.getElementById(this.json.editarServico).style.display='none';
    document.getElementById(this.json.alterarServicos).style.display='none';
    document.getElementById(this.json.apresentarEstado).style.display='none';
    document.getElementById(this.json.okBotao).style.display='none';
    document.getElementById(this.json.mostrarTabelaMenu).style.display='none';
    //document.getElementById(this.json.teste).style.display='none';
    

    
    
  
  }

selectedValue = null;

mudarAccao(elemento) {
  
  //if(elemento[0]==0) {
  
    //this.showNothing();
  //}

  if(elemento[0]==0) {
    this.showNothing();
    document.getElementById(this.json.servicoCategoria).style.display = 'block';
    //document.getElementById(this.json.mostrarServico).style.display = 'block';
    //document.getElementById(this.json.teste).style.display = 'block';
  }

  if(elemento[0]==1) {
    this.showNothing();
    document.getElementById(this.json.editar).style.display = 'block';
  }

  if(elemento[0]==2) {
    this.showNothing();
    document.getElementById(this.json.restaurante).style.display = 'block';
  }

  if(elemento[0]==3) {
    this.showNothing();
    document.getElementById(this.json.adicionarCategoria).style.display='block';
  }

  if(elemento[0]==4) {
    this.showNothing();
    document.getElementById(this.json.editarServico).style.display='block';
  }


}



onDeleteConfirm(event): void {
  if (window.confirm(this.json.mensagemApagar)) {
    event.confirm.resolve();
  } else {
    event.confirm.reject();
  }
}




onEditConfirm(event):void {
  if (window.confirm(this.json.mensagemEditar)) {
      
    event.confirm.resolve();
     
      
     
    } else {
      event.confirm.reject();
    }
  }


settings = {
  actions: false,
  add: {
    addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    createButtonContent: '<i class="ion-checkmark"></i>',
    cancelButtonContent: '<i class="ion-close"></i>',
    confirmCreate: true
  },
  edit: {
    editButtonContent: '<i class="ion-edit"></i>',
    saveButtonContent: '<i class="ion-checkmark"></i>',
    cancelButtonContent: '<i class="ion-close"></i>',
    confirmEdit:true,
    confirmSave :true
  },
  delete: {
    deleteButtonContent: '<i class="ion-trash-a"></i>',
    confirmDelete: true
  },
  columns: {
    nome:{

      title: 'Nome do Serviço',
      type: 'string'

    },
    quantidade:{
      title: 'Quantidade pedida pelo cliente',
      type: 'number'
    },
    dataInicio: {
      title: 'Data de Inicio(yyyy/mm/dd)',
      type: 'string'
    },
     dataFim: {
      title: 'Data de Fim(yyyy/mm/dd)',
      type: 'string'
    },
    descricao: {
      title: 'Descrição do serviço',
      type: 'string'
    },
    precoCliente: {
     title: 'Valor pago pelo cliente',
     type: 'string'
   },

   precoServico: {
     title: 'Preço do Serviço',
     type: 'number'
   }
    
  }
};




tableHide() {
  var x = document.getElementById(this.json.servicoCategoria);
  if (x.style.display === "block") {
      x.style.display = "none";
      
      
  } 
  


}
  onChange() {
    ///var valor = elemento.split(':');
    
    //this. valorEscolhido=valor[1].trim();
    var i=0;
    var j=0;
    //var encontrado =false;
    this.getServicos().subscribe(_ => {
      this.info=[];
      for(i=0;i<this.servicos.length;i++) {
        
         if(this.servicos[i][this.json.pedidosExternos].length>=1){
             for(j=0;j<this.servicos[i][this.json.pedidosExternos].length;j++) {
                this.info.push(
                  new InfoServico(
                    this.servicos[i][this.json.nome],
                    this.servicos[i][this.json.pedidosExternos][j+""][this.json.quantidade],
                    this.servicos[i][this.json.pedidosExternos][j+""][this.json.dataInicio],
                    this.servicos[i][this.json.pedidosExternos][j+""][this.json.dataFim],
                    this.servicos[i][this.json.pedidosExternos][j+""][this.json.descricao],
                    this.servicos[i][this.json.pedidosExternos][j+""][this.json.preco],
                    this.servicos[i][this.json.preco]
                  )
                );
             }

            }  

         if(this.servicos[i][this.json.pedido].length>=1){
            for(j=0;j<this.servicos[i][this.json.pedido].length;j++) {
                this.info.push(
                  new InfoServico(
                    this.servicos[i][this.json.nome],
                    this.servicos[i][this.json.pedido][j+""][this.json.quantidade],
                    this.servicos[i][this.json.pedido][j+""][this.json.dataInicio],
                    this.servicos[i][this.json.pedido][j+""][this.json.dataFim],
                    this.servicos[i][this.json.pedido][j+""][this.json.descricao],
                    this.servicos[i][this.json.pedido][j+""][this.json.preco],
                    this.servicos[i][this.json.preco]
                  )
                );
              }

          }



      
        
      }

      this.source.load(this.info);

    });
  document.getElementById(this.json.servicoCategoria).style.display = 'block';
    
  }
  
     



 
}
