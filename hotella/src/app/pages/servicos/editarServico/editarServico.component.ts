import {Component,OnInit} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { VariableAst } from '@angular/compiler';
import { Http } from '@angular/http';
import { Categoria } from '../categoria';
import {Json} from '../json';
import {EditarServicoService} from './editarServico.service';
import {Servico} from '../servico';
import {EditarServic} from './editarServico';

@Component({
    selector: 'editarServico',
    templateUrl: './editarServico.html',
    styleUrls: ['./editarServico.scss']
  
  })
  export class EditarServico implements OnInit{
    json :Json;
    listaServicos:Servico [];
    valorSelecionado:string;
    servicoSelecionado :Servico;
    nomeServico:string;
    precoServico:number;
    estadoServico:string;
    ativo:boolean;
    ativoEstado:boolean;
    estados:string[];



    constructor(private service: EditarServicoService) {
      this.json=new Json();  
      this.listaServicos=[];
      this.valorSelecionado="";
      this.ativo=true;
      this.ativoEstado=true;
      this.estados=this.json.listaDeEstados;
    }

    getServicos(){
        return this.service
        .getServicos()
        .map(
          (servicos) => {
            this.listaServicos = servicos;
          })
         .catch((error) => {
            throw error;
          });
      }
    
    ngOnInit() {

        var valor=-1;
     this.service.getTamanho().subscribe(data=>{valor=data
    
      if(valor>=1) 
        this.getServicos().subscribe(_ => {});
    
    });
    }

    mostrarServico(elemento) {
        this.showNothing();
        this.ativo=true;
        var valor = elemento.split(':'); 
        this.valorSelecionado=valor[1].trim();
        this.listaServicos=[];
        this.getServicos().subscribe(_ => {
            var i=0;
            var estado1="";
            var encontrado=false;
            for(i=0;encontrado==false;i++) {
  
              
                if(this.valorSelecionado.trim()===this.listaServicos[i][this.json.nome].trim()) {
                    estado1=this.json.convertNumberToString(this.listaServicos[i][this.json.estado]);
                this.servicoSelecionado =new Servico(
                            this.listaServicos[i][this.json.idServico],
                            this.listaServicos[i][this.json.nome],
                            this.listaServicos[i][this.json.preco],
                            estado1
                        );
                    encontrado=true;
                    this.nomeServico=this.servicoSelecionado.nome.trim();
                    this.estadoServico=this.servicoSelecionado.estado.trim();
                    this.precoServico=this.servicoSelecionado.preco;

                    
              }
            }
            
        });

        
        

        document.getElementById(this.json.alterarServicos).style.display = 'block';
     
    }

    
    editarEstados(elemento) {

        //this.ativo=true;
        var valor = elemento.split(':');
        this.estadoServico=valor[1];

    }

    showNothing() {
        document.getElementById(this.json.apresentarEstado).style.display='none';
    document.getElementById(this.json.okBotao).style.display='none';
    }

    cancelar() {
        this.showNothing();
        this.ativo=true;
        this.estadoServico=this.servicoSelecionado.estado;
        this.nomeServico=this.servicoSelecionado.nome;
        this.precoServico=this.servicoSelecionado.preco;


    }


    editar() {

        this.ativo=false;
        document.getElementById(this.json.okBotao).style.display = 'block';
        document.getElementById(this.json.apresentarEstado).style.display='block';


    }

    concluir() {
        if (window.confirm(this.json.editarServicoM)) {

        if(this.json.verificaString(this.nomeServico.trim) || 
            this.json.verificaNumero(this.precoServico)    
        )
        {
            alert(this.json.dadoInvalidos);

        }    

        else {
        var estado1=this.json.convertStringToNumber(this.estadoServico);
        var servicoEnviar=new EditarServic(this.servicoSelecionado.idServico,
                                      this.nomeServico,
                                      this.precoServico,
                                      estado1);
        
        this.ativo=true;
        this.showNothing();
        this.service.updateServico(servicoEnviar).subscribe();

        }
        }
    }   
  


}