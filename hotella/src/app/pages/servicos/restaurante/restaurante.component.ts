import { Component , OnInit} from '@angular/core';
import { RestauranteService } from './restaurante.service';
import { LocalDataSource } from 'ng2-smart-table';
import { VariableAst } from '@angular/compiler';
import {RestauranteRecebe} from './restaurante';
import {Json} from '../json';
import {VisualisarRestaurante} from './visualizarRestaurante';
import {EnviaRestaurante} from './enviaRestaurante';
@Component ({
    selector: 'restaurante',
    templateUrl:'./restaurante.html',
    styleUrls: ['./restaurante.scss']
 })

 export   class   Restaurante implements OnInit{
    source: LocalDataSource;
    ementa : RestauranteRecebe[];
    json :Json;
    envia : VisualisarRestaurante[];
    estadoSelecionado :string;
    listaDeEstados:Array<String>;
    info : VisualisarRestaurante[];


    constructor(protected service: RestauranteService) {
      this.source=new LocalDataSource();
      this.ementa=[];
      this.json=new Json();
      this.envia=[];
      this.estadoSelecionado="";
      this.listaDeEstados=this.json.listaCategorias;
    }



    onChange(elemento) {

         
      var valor = elemento.split(':');

      this.estadoSelecionado=valor[1].trim();

      this.getMenu().subscribe(_ => {
        var j=0;
        this.info =[];
        var estado ="";
        
      
          
        
          for(j=0;j<this.ementa.length;j++) {
            estado =this.json.convertNumberToString((this.ementa[j][this.json.estado]));
            if(estado.trim()===this.estadoSelecionado.trim()){
              
              this.info.push(new VisualisarRestaurante(
                this.ementa[j][this.json.idMenu],
                this.ementa[j][this.json.descricao].trim(),
                this.ementa[j][this.json.tipo].trim(),
                this.ementa[j][this.json.regime].trim(),
                this.ementa[j][this.json.preco]
              ));

            }
          }
                   
       this.source.load(this.info);
      });




      document.getElementById(this.json.mostrarTabelaMenu).style.display = 'block';
    }




    

    ngOnInit() {
      this.getMenu().subscribe(_=>{ 
      });

    }


    getMenu() {
    return this.service
    .getMenu()
    .map(
      (ementa) => {
        this.ementa = ementa;
      })
     .catch((error) => {
        throw error;
      });
  }



    tableHide() {
        var x = document.getElementById(this.json.mostrarTabelaMenu);
        if (x.style.display === "block") {
            x.style.display = "none";
            
        } 

    }

   
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
          confirmEdit :true,
          confirmSave :true
        },
        delete: {
          deleteButtonContent: '<i class="ion-trash-a"></i>',
          confirmDelete: true
        },
        columns: {
          descricao: {
            title: 'Nome do prato',
            type: 'string'
          },
          tipo: {
            title: 'Tipo do prato',
            type: 'string'
          },
          regime: {
            title: 'Quando será servido',
            type: 'string'
          },
         
          preco: {
            title: 'Preço do Prato',
            type: 'number'
          },
          
        }
      };
      
      onDeleteConfirm(event) {

        
        if (window.confirm(this.json.apagarMenu)) {
          
               this.service.deleteMenu(event.data[this.json.idMenu]).subscribe();
               
               event.confirm.resolve(event.data);
               
             
           }
             else {
               event.confirm.reject();
             }

      }
      
    
     
    
      onUpdateConfirm(event): void {
        if (window.confirm(this.json.editarMenu)) {
          //var estado=this.json.convertStringToNumber(event.newData[this.json.estado]);
          if(this.json.verificaString(event.newData[this.json.descricao].trim()) || 
          this.json.verificaString(event.newData[this.json.tipo].trim()) ||
          this.json.verificaString(event.newData[this.json.regime].trim()) ||
          this.json.verificaNumero(event.newData[this.json.preco].trim())
         ) {
             alert(this.json.dadoInvalidos);
             

         }

         else {

          var elemento=new RestauranteRecebe(
            event.newData[this.json.idMenu],
            event.newData[this.json.descricao],
            event.newData[this.json.tipo],
            event.newData[this.json.regime],
            event.newData[this.json.preco],
            1
          );


          
          //this.service.updateMenu(elemento).subscribe();
          
          event.confirm.resolve(); 
        }
          
        } else {
          event.confirm.reject();
        }
      }

      actualizar() {

        this.getMenu().subscribe(_ => {
          var j=0;
          this.info =[];
          var estado ="";
          
        
            
          
            for(j=0;j<this.ementa.length;j++) {
              estado =this.json.convertNumberToString((this.ementa[j][this.json.estado]));
              if(estado.trim()===this.estadoSelecionado.trim()){
                
                this.info.push(new VisualisarRestaurante(
                  this.ementa[j][this.json.idMenu],
                  this.ementa[j][this.json.descricao],
                  this.ementa[j][this.json.tipo],
                  this.ementa[j][this.json.regime],
                  this.ementa[j][this.json.preco]
                ));
  
              }
            }
                     
         this.source.load(this.info);
        });
  

      }


      onCreateConfirm(event):void {
        if (window.confirm(this.json.criarMenu)) {
          var estado1=this.json.convertStringToNumber(this.estadoSelecionado.trim());

          if(this.json.verificaString(event.newData[this.json.descricao].trim()) || 
             this.json.verificaString(event.newData[this.json.tipo].trim()) ||
             this.json.verificaString(event.newData[this.json.regime].trim()) ||
             this.json.verificaNumero(event.newData[this.json.preco].trim())
            ) {
                alert(this.json.dadoInvalidos);
                

            }

            else {

           var enviarRestaurante= new EnviaRestaurante(
            event.newData[this.json.descricao],
            event.newData[this.json.tipo],
            event.newData[this.json.regime],
            event.newData[this.json.preco],
            estado1
            ); 
          
         
            this.service.saveMenu(event.newData).subscribe(); 
            event.confirm.resolve();   
            this.onChange(this.json.transforma(this.estadoSelecionado));
          }
            
           
          } else {
            event.confirm.reject();
          }
        }



 }