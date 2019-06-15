import {Component,OnInit} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {CriarCategoriaService} from './criarCategoria.service';
import { LocalDataSource } from 'ng2-smart-table';
import { VariableAst } from '@angular/compiler';
import { Http } from '@angular/http';
import { Categoria } from '../categoria';
import {EnviarServicos} from '../enviarServico';
import {Json} from '../json';
import {EnviarCategoria} from './enviarCategoria';
import {EnviarCriaCategoria} from './enviarCriaCategoria';
//import {ApagarCategoria} from './apagarCategoria';
import {UpdateCategoria} from './updateCategoria';

@Component({
    selector: 'criarCategoria',
    templateUrl: './criarCategoria.html',
    styleUrls: ['./criarCategoria.scss']
  
  })
  export class CriarCategoria implements OnInit{
    
    
    query: string = '';
    source: LocalDataSource;
    categorias: Categoria[];
    info :EnviarCategoria[];
    json : Json;
    errorMessage: string;
    estadoCategorias :Array<any>;
    valorSelecionado:string;
    
    //enviaCategoria : EnviarCategoria={idCategoria:-1,nome:"",tipoPagamento:"",estado:""};
    
       settings = {

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
             title: 'Nome da Categoria',
             type: 'string'
           },
           tipoPagamento: {
             title : 'Tipo de Pagamento',
             type : 'string'
           },
           
         }
       };

       
       constructor(private service: CriarCategoriaService,private cdRef:ChangeDetectorRef) {
        this.categorias=[];
        this.info=[];
        this.source=new LocalDataSource();
        this.json=new Json();
        this.estadoCategorias=this.json.listaCategorias;
        this.valorSelecionado="";
       }

       

       getCategorias() {
        return this.service
        .getAll()
        .map(
          (categorias) => {
            this.categorias = categorias;
          })
         .catch((error) => {
            throw error;
          });
      }
    



      mostrarCategorias(elemento) {

        var valor = elemento.split(':');
  
        this.valorSelecionado=valor[1].trim();

        this.getCategorias().subscribe(_ => {
          var i=0;
          this.info=[];
          var estado1="";
          for(i=0;i<this.categorias.length;i++) {

            estado1=this.json.convertNumberToString(this.categorias[i][this.json.estado]);
              if(this.valorSelecionado.trim()===estado1.trim()) {
              this.info.push(new EnviarCategoria(
              this.categorias[i][this.json.idCategoria],
              this.categorias[i][this.json.nome].trim(),
              this.categorias[i][this.json.tipoPagamento].trim(),
              estado1
             ));
            }
          }

          this.source.load(this.info);
      
      });



        document.getElementById(this.json.mostrarTabelaCategoria).style.display='block';
      }

       ngOnInit(){
             
        this.getCategorias().subscribe(_ => {
        });
       }

       actualizar() {

        if(this.valorSelecionado!="") {
        this.getCategorias().subscribe(_ => {
          var i=0;
          this.info=[];
          var estado1="";
          for(i=0;i<this.categorias.length;i++) {

            estado1=this.json.convertNumberToString(this.categorias[i][this.json.estado]);
              if(this.valorSelecionado.trim()===estado1.trim()) {
              this.info.push(new EnviarCategoria(
              this.categorias[i][this.json.idCategoria],
              this.categorias[i][this.json.nome].trim(),
              this.categorias[i][this.json.tipoPagamento].trim(),
              estado1
             ));
            }
          }

          this.source.load(this.info);
      
      });

    }

       }
       
       tableHide() {
        var x = document.getElementById(this.json.mostrarTabelaCategoria);
        if (x.style.display === "block") {
            x.style.display = "none";
            
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

           var enviarInfo = new UpdateCategoria( 
             event.newData[this.json.idCategoria],
              event.newData[this.json.nome],
              event.newData[this.json.tipoPagamento],
              1
            );
            
            
           this.service.updateCategoria(enviarInfo).subscribe(); 
            
            event.confirm.resolve();
            

            //this.mostrarCategorias(this.json.transforma(this.valorSelecionado));
           
          
         
        

        }
      }
        else {
        event.confirm.reject();
      }



    }
    onCreateConfirm(event):void {
        if (window.confirm(this.json.criarCategoriaM)) {

          if(this.json.verificaString(event.newData[this.json.nome].trim()) || 
          this.json.verificaString(event.newData[this.json.tipoPagamento].trim())) {

              alert(this.json.dadoInvalidos);
          }
          else {

            var estado:number;
           estado=this.json.convertStringToNumber(this.valorSelecionado.trim());
           //var estado1=this.json.convertNumberToString(estado);

             var enviarInfo = new EnviarCriaCategoria( event.newData[this.json.nome],
                event.newData[this.json.tipoPagamento],
                estado
              );
              
             this.service.saveCategoria(enviarInfo).subscribe(); 
              
              event.confirm.resolve();
              

              this.mostrarCategorias(this.json.transforma(this.valorSelecionado));
             
            }

            }
            else {
            event.confirm.reject();
          }
        
    }



    onDeleteConfirm(event):void {

          if (window.confirm(this.json.desativarCategoria)) {
         /*
            var estado:number;
           estado=this.json.convertStringToNumber(event.data[this.json.estado].trim());
            
             var enviarInfo = new ApagarCategoria( 
               event.data[this.json.idCategoria],
               event.data[this.json.nome],
                event.data[this.json.tipoPagamento],
                estado
              );
              */
              this.service.deleteCategoria(event.data[this.json.idCategoria]).subscribe();
              
              event.confirm.resolve(event.data);
              //this.ngOnInit();
            
          }
            else {
              event.confirm.reject();
            }


    }  




    }      