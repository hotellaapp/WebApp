import { Component,OnInit } from '@angular/core';
import {Json} from '../json';
import { SmartTablesService } from './categories.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ShowService } from '../showservices/service.component';
import {Categoria} from './categoria';
import {EnviarCriaCategoria} from './enviarCriaCategoria';
import { User } from '../../login/services/user';
import {UpdateCategoria} from './updateCategoria';

// ir a node_modules\ng2-smart-table\ng2-smart-table.component.js e mudar columnTitle: '',
//ir a node_modules\ng2-smart-table\components\filter\filter-types\input-filter.component.js e mudar placeholder=\"Search\"

@Component({
  selector: 'categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.scss']
})
export class SmartTables implements OnInit{
  categorias: Categoria[];
  setClickedRow : Function;
  query: string = '';
  selectedRow : Number;
  json :Json;
  info : Categoria[];
  source: LocalDataSource;
  status: boolean;
  user: User;

  settings = {
  };

  constructor(protected service: SmartTablesService) {
    this.settings = {
      //actions: false,
      columns: {
        /*idCategoria:{
          type: 'number',
          title: 'ID',
          show: false
        },*/
        nome: {
          title: 'Nome',
          type: 'string',
          //filter: false
        },
        estado: {
          title : 'Estado',
          type : 'string'
         }
      }
    };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.user = new User("asd","asd","ADMIN");
    console.log("User nome : "+this.user.role);
    if(this.user.role=="ADMIN"){
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
          /*idCategoria:{
            type: 'number',
            title: 'ID',
            show: false
          },*/
          nome: {
            title: 'Nome',
            type: 'string',
            //filter: false
          },
          estado: {
            title : 'Estado',
            type : 'string'
           }
        }
      };
    } 
    this.status=true;
    this.source=new LocalDataSource();
    this.json=new Json();
    this.info=[];
    this.categorias=[];
    this.setClickedRow = function(index){
      this.selectedRow = index;
    }
  }

  getCategorias() {
    return this.service
    .getAll()
    .map(
      (categorias1) => {
        this.categorias = categorias1;
        console.log(this.categorias);
      })
     .catch((error) => {
        throw error;
      });
  }

  ngOnInit(){     
    setInterval(()=>{
      document.getElementById(this.json.services).style.display = 'block';
      document.getElementById(this.json.requests).style.display = 'block';
      document.getElementById(this.json.comments).style.display = 'block';
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.user = new User("asd","asd","ADMIN");
      //console.log("User nome : "+this.user.role);
      /*if(this.user.role=="ADMIN"){
        this.settings = {
          /*actions: {
            edit: false
          },
          add: {
            addButtonContent: '<i class="ion-ios-plus-outline"></i>',
            createButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmCreate: true
          },
          edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>'
            //confirmEdit: true
          },
          delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true
          },
          columns: {
            /*idCategoria:{
              type: 'number',
              title: 'ID',
              show: false
            },
            nome: {
              title: 'Nome',
              type: 'string',
              //filter: false
            },
            estado: {
              title : 'Estado',
              type : 'string',
              //add : false,
              //width:'10%'
             }
          }
        };
      }*/ 
      this.getCategorias().subscribe(_ => {
        this.info=[];
        var estado1="";
        //console.log("idCategoria "+this.categorias[0][this.json.idCategoria]);
        //console.log("nome "+this.categorias[0][this.json.nome].trim());
        //console.log("tipoPagamento "+this.categorias[0][this.json.servicos]);
        for(var i=0;i<this.categorias.length;i++) {
          //console.log(this.categorias[i][this.json.servicos][0].nome);
          estado1=this.json.convertNumberToString(this.categorias[i][this.json.estado]);
          this.info.push(new Categoria(
          this.categorias[i][this.json.idCategoria],
          this.categorias[i][this.json.nome].trim(),
          estado1,
          this.categorias[i][this.json.servicos]
          
          ));
        }
        this.source.load(this.info); 
        });
      //console.log("Requests : serviceId = "+localStorage.getItem('idService'));
    },5000)
   }

  onDeleteConfirm(event):void {
    if (window.confirm(this.json.desativarCategoria)) {
      console.log("idCategoria: "+event.data[this.json.idCategoria]);
      this.service.deleteCategorie(event.data[this.json.idCategoria]).subscribe();
      event.confirm.resolve(event.data); 
    }
    else {
      event.confirm.reject();
    }
  }

  onCellClick(event): void {
    document.getElementById(this.json.services).style.display = 'block';
    localStorage.setItem('idCategoria', event.data.idCategoria);
    localStorage.setItem('categoria', event.data.nome);
  }

  onCreateConfirm(event):void {
    //this.settings.columns["id"].show =false;
    if (window.confirm(this.json.criarCategoriaM)) {

      if(this.json.verificaString(event.newData[this.json.nome].trim())) {
      alert(this.json.dadoInvalidos);
      }
      else {
        var estado_ = event.newData[this.json.estado].trim();
        console.log("Estado : "+estado_);
        if(estado_!="Ativo" && estado_!="ativo" && estado_!="Inativo" && estado_!="inativo"){
          alert("Por favor insira, \"ativo\" ou \"inativo\"");
        }
        else{
          var estado:number;
          //estado=this.json.convertStringToNumber(this.valorSelecionado.trim());

          var enviarInfo = new EnviarCriaCategoria( 
            event.newData[this.json.nome],
            1
          );
          this.service.saveCategoria(enviarInfo).subscribe(); 
          event.confirm.resolve();
            //this.mostrarCategorias(this.json.transforma(this.valorSelecionado));
          }
        }
        }
        else {
        event.confirm.reject();
      }
  }

  editar(event) :void {
    if (window.confirm(this.json.editarCategoria)) {
      if(this.json.verificaString(event.newData[this.json.nome].trim())) {
          alert(this.json.dadoInvalidos);
      }
      else {

        //var estado:number;
       //estado=this.json.convertStringToNumber(this.valorSelecionado.trim());
       //var estado1=this.json.convertNumberToString(estado);

         var enviarInfo = new UpdateCategoria( 
            event.newData[this.json.nome],
            1
          );

         this.service.updateCategoria(event.newData[this.json.idCategoria],enviarInfo).subscribe(); 
        event.confirm.resolve();
          //this.mostrarCategorias(this.json.transforma(this.valorSelecionado));
      }
    }
      else {
      event.confirm.reject();
    }
  }

}
