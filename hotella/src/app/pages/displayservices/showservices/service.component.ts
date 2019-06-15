import { Component,OnInit } from '@angular/core';
import {Json} from '../json';
import { ShowServiceService } from './service.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Service } from './servico';
import {Card} from 'ng2-card';
import {Categoria} from '../servicecategories/categoria';
import {EnviarServicos} from '../enviarServico';
import { User } from '../../login/services/user';
import {EditarServico} from './editarServico';

@Component({
  selector: 'service',
  templateUrl: './service.html',
  styleUrls: ['./service.scss']
})
export class ShowService implements OnInit{
  setClickedRow : Function;
  query: string = '';
  selectedRow : Number;
  json :Json;
  categoria : string;
  services : Service[];
  categorie: Categoria[];
  info : Service[];
  enviarInfo : EnviarServicos={estado:-1,idCategoria:-1,nome:"",preco:-1,tipoPagamento:""};
  valorEstado:string;
  valorSelecionado :string;
  user: User;

  settings = {
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: ShowServiceService) {
    this.settings = {
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
        nome: {
          title: 'Nome',
          type: 'string'
        },
        tipoPagamento: {
          title : 'Tipo de Pagamento',
          type : 'string'
        },
        preco: {
          title: 'Preço',
          type: 'number'
        },
        estado: {
          title : 'Estado',
          type : 'string'
         }
      }
    };
    this.valorSelecionado="";
    this.json=new Json();
    this.valorEstado="";
    this.setClickedRow = function(index){
    this.selectedRow = index;
    }
  }

  getServicos() {
    return this.service
    .getAllCategorie()
    .map(
      (categorias) => {
        this.categorie=categorias;
      })
     .catch((error) => {
        throw error;
      });
  } 

  ngOnInit(){     
    setInterval(()=>{
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.user = new User("asd","asd","ADMIN");
      console.log("User nome : "+this.user.role);
        this.categoria=localStorage.getItem('categoria');
        var idCategoria = localStorage.getItem('idCategoria');
        this.getServicos().subscribe(_ => {
          this.info=[];
          var estado ="";
          //console.log("idCategoria "+this.categorie[this.json.servicos]);
          //console.log(" 111 "+this.categorie[0][this.json.servicos][0].nome);
          for(var i=0;i<this.categorie.length;i++) {
            if(idCategoria==this.categorie[i][this.json.idCategoria]){
              //console.log("idCategoria___"+this.categorie[i][this.json.idCategoria]);
            for(var j=0;j<this.categorie[i][this.json.servicos].length;j++) {
              estado =this.json.convertNumberToString((this.categorie[i][this.json.servicos])[j+""][this.json.estado]);
              //console.log("idService : "+(this.categorie[i][this.json.servicos])[j+""][this.json.idServico]);
                this.info.push(new Service(
                  this.categorie[i][this.json.servicos][j+""][this.json.idServico],
                  this.categorie[i][this.json.servicos][j+""][this.json.nome],
                  this.categorie[i][this.json.servicos][j+""][this.json.preco],
                  this.categorie[i][this.json.servicos][j+""][this.json.tipoPagamento],
                  estado
                ));
              }
            }
          }
          this.source.load(this.info);
          });
    },3000)
   }

    onDeleteConfirm(event): void {
      if (window.confirm(this.json.desativarServico)) {  
        console.log("idService: "+event.data[this.json.idServico]);
        this.service.deleteServico(event.data[this.json.idServico]).subscribe();    
        event.confirm.resolve(event.data);
      } else {
        event.confirm.reject();
      }
    }

    onCellClick(event): void {
      document.getElementById(this.json.requests).style.display = 'block';
      localStorage.setItem('idService', event.data.idServico);
      document.getElementById(this.json.comments).style.display = 'block';
      console.log(localStorage.getItem('idService'));
    }
    
    //(userRowSelect)="onCellClick($event)"
    onCreateConfirm(event):void {
      console.log(" CREATE BUTTON");
      if (window.confirm(this.json.mensagemCriar)) {

        if(this.json.verificaString(event.newData[this.json.nome].trim()) ||
            this.json.verificaNumero(event.newData[this.json.preco])) {
          alert(this.json.dadoInvalidos);
        }
        else {
          var estado_ = event.newData[this.json.estado].trim();
        console.log("Estado : "+estado_);
        if(estado_!="Ativo" && estado_!="ativo" && estado_!="Inativo" && estado_!="inativo" && estado_!="Informações" && estado_!="informações"
        && estado_!="externo" && estado_!="Externo" && estado_!="Informções" && estado_!="informações" && estado_!="Externo Informativo" && estado_!="externo informativo" 
        ){
          alert("Por favor insira, \"ativo\" ou \"inativo\"");
        }
        else{
          /*var enviarInfo = new EnviarCriaCategoria( 
            event.newData[this.json.nome],
            1
          );*/
          this.enviarInfo.nome=event.newData[this.json.nome];
          this.enviarInfo.estado=this.json.convertStringToNumber(event.newData[this.json.estado]);
          this.enviarInfo.preco=this.json.convertStringToNumber(event.newData[this.json.preco]);
          this.enviarInfo.tipoPagamento=event.newData[this.json.tipoPagamento];
          console.log(localStorage.getItem('idCategoria'));
          this.enviarInfo.idCategoria=Number(localStorage.getItem('idCategoria'));
          console.log(this.enviarInfo);
          
          this.service.saveService(this.enviarInfo).subscribe();    
          event.confirm.resolve();
          }
        } 

        } else {
          event.confirm.reject();
        } 
      }

      editar(event) :void {
        if (window.confirm(this.json.editarCategoria)) {
          if(this.json.verificaString(event.newData[this.json.nome].trim()) || 
          this.json.verificaString(event.newData[this.json.tipoPagamento].trim())) {
              alert(this.json.dadoInvalidos);
          }
          else {
            //var estado:number;
           //estado=this.json.convertStringToNumber(this.valorSelecionado.trim());
           //var estado1=this.json.convertNumberToString(estado);
             var enviarInfo = new EditarServico(
               1, 
               Number(localStorage.getItem('idCategoria')),
                event.newData[this.json.nome],
                event.newData[this.json.preco],
                event.newData[this.json.tipoPagamento],
              );
    
            this.service.updateCategoria(event.newData[this.json.idServico],enviarInfo).subscribe(); 
            event.confirm.resolve();
              //this.mostrarCategorias(this.json.transforma(this.valorSelecionado));
          }
        }
          else {
          event.confirm.reject();
        }
      }
}
