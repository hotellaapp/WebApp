import {Component,OnInit} from '@angular/core';
import {EditarService} from './editar.service';
import { LocalDataSource } from 'ng2-smart-table';
import { VariableAst } from '@angular/compiler';
import { Http } from '@angular/http';
import { Servico } from '../servico';
import { Categoria } from '../categoria';
import {InformacaoFinal} from'./informacaoFinal';
import {EnviarServicos} from '../enviarServico';
import {Json} from '../json';
import {Apagar} from './apagar';

@Component({
    selector: 'editar',
    templateUrl: './editar.html',
    styleUrls: ['./editar.scss']
  
  })
  export class Editar implements OnInit{
    
    
    query: string = '';
    source: LocalDataSource;
    categorias: Categoria[];
    info :InformacaoFinal[];
    servicosD : Servico[];
    servico : Servico;
    valorSelecionado :string;
    json : Json;
    enviarInfo : EnviarServicos={nome:"",estado:-1,preco:-1,nomecategoria:""};
    apagar : Apagar={nome:"",preco:-1,estado:-1};
    errorMessage: string;
    valorEstado:string;
    estados:string[];
    mostrarCategorias :Categoria[];
    
       settings = {
        actions : {
            edit:false,
            delete:false
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
           cancelButtonContent: '<i class="ion-close"></i>',
         },
         delete: {
           deleteButtonContent: '<i class="ion-trash-a"></i>',
           confirmDelete: true
         },
         columns: {
           nome: {
             title: 'Nome do Serviço',
             type: 'string'
           },
           preco: {
            title : 'Preço do Serviço',
            type : 'number'
           }
           
         }
       };

       
       constructor(private service : EditarService) {
        this.categorias=[];
        this.info=[];
        this.servicosD=[];
        this.source=new LocalDataSource();
        this.valorSelecionado="";
        this.json=new Json();
        this.valorEstado="";
        this.estados=this.json.listaDeEstados;
       }

       getServicos() {
        return this.service
        .getServico()
        .map(
          (servicos) => {
            this.servicosD = servicos;
          })
         .catch((error) => {
            throw error;
          });
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
    
       ngOnInit(){
         
        this.getCategorias().subscribe(_ => {
          var i=0;
          this.mostrarCategorias=[];

          for(i=0;i<this.categorias.length;i++) {

            if(this.categorias[i][this.json.estado]==1) {
              this.mostrarCategorias.push(this.categorias[i]);

            }



          }



          });
        
       }
     
       onDeleteConfirm(event): void {
         if (window.confirm(this.json.desativarServico)) {
          /*
          this.apagar.nome=event.data[this.json.nome];
          this.apagar.estado=this.json.convertStringToNumber(event.data[this.json.estado]);
          this.apagar.preco=event.data[this.json.preco];
        */
            
          this.service.deleteServico(event.data[this.json.idServico]).subscribe();    
          event.confirm.resolve();
         } else {
           event.confirm.reject();
         }
       }
  
       
       verificar(event):void {
           
         //this.service.getData().then((data) => {
          //   event.confirm.resolve();
           //  this.recarregar();
             
  
          // });     
     
       }
  
       onCreateConfirm(event):void {
         if (window.confirm(this.json.mensagemCriar)) {

          if(this.json.verificaString(event.newData[this.json.nome].trim()) ||
             this.json.verificaNumero(event.newData[this.json.preco])    
        ) 
         {
          alert(this.json.dadoInvalidos);
         }
         else {

            this.enviarInfo.nome=event.newData[this.json.nome];

            this.enviarInfo.estado=this.json.convertStringToNumber(this.valorEstado.trim());
            this.enviarInfo.preco=event.newData[this.json.preco];
            this.enviarInfo.nomecategoria=this.valorSelecionado;
          /*
            var elemento=new InformacaoFinal(1,
              event.newData[this.json.nome],
              this.json.convertNumberToString(this.enviarInfo.estado),
              event.newData[this.json.preco],
              event.newData[this.json.nome]
            );
            */

            event.confirm.resolve();
            this.service.saveServico(this.enviarInfo).subscribe();    
            //this.onChange(this.json.transforma(this.valorSelecionado));
          } 

           } else {
             event.confirm.reject();
           }

           
         }
      
         tableHide() {
            var x = document.getElementById(this.json.apresentarServico);
            if (x.style.display === "block") {
                x.style.display = "none";
                
            }
            x =document.getElementById(this.json.mostrarEstado);

            if (x.style.display === "block") {
              x.style.display = "none";
              
          }
    

        }

    

      onChange(elemento) {

         
          var valor = elemento.split(':');
  
          this.valorSelecionado=valor[1].trim();
        /*
          this.getCategorias().subscribe(_ => {
            var i=0;
            var j=0;
            var k=0;
            this.info =[];
            this.estados=[];
            var encontado = false;
            var estado="";
          for(i=0;encontado==false;i++) {
              
            if(this.categorias[i][this.json.nome].trim()==this.valorSelecionado) {
              for(j=0;j<this.categorias[i][this.json.servicos].length;j++) {
                estado=this.json.convertNumberToString((this.categorias[i][this.json.servicos])[j+""][this.json.estado]);
                this.estados.push(estado
                );
  
              }
             encontado=true;
            }
          }            
           //this.source.load(this.info);
          });
          */
          document.getElementById(this.json.apresentarServico).style.display='none';
          document.getElementById(this.json.mostrarEstado).style.display='block';
          //document.getElementById(this.json.apresentarServico).style.display = 'block';


        }

        mostrarServicos(elemento) {
          var valor = elemento.split(':');

          this.valorEstado=valor[1].trim();
          this.getCategorias().subscribe(_ => {
            var i=0;
            var j=0;
            var k=0;
            this.info =[];
            var encontado = false;
            var estado ="";
            
          for(i=0;encontado==false;i++) {
              
            if(this.categorias[i][this.json.nome].trim()===this.valorSelecionado) {
              for(j=0;j<this.categorias[i][this.json.servicos].length;j++) {
                estado =this.json.convertNumberToString((this.categorias[i][this.json.servicos])[j+""][this.json.estado]);
                if(estado.trim()===this.valorEstado){
                  
                  this.info.push(new InformacaoFinal(
                    (this.categorias[i][this.json.servicos])[j+""][this.json.idServico],
                    (this.categorias[i][this.json.servicos])[j+""][this.json.nome],
                    (this.categorias[i][this.json.servicos])[j+""][this.json.preco]
                   
                  ));

                }
                
               
  
              }
             encontado=true;
            }
          }            
           this.source.load(this.info);
          });




          document.getElementById(this.json.apresentarServico).style.display = 'block';
        }
      


       
        
       

    
  }
  


