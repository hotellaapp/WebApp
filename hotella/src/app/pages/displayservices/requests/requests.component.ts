import {Component, Input, SimpleChange} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit,OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import {BasicTablesService} from './requests.service';
import {Json} from '../json';

@Component({
  selector: 'condensed-table',
  templateUrl: './requests.html',
  styleUrls: ['./requests.scss']
})

export class CondensedTable implements OnInit{

   peopleTableData:Array<any>;
   peopleTableData2:Array<any>;
   errorMessage: string = '';
   selectedRow : Number;
   setClickedRow : Function;
   json :Json;

  constructor(private _basicTablesService: BasicTablesService) {
    /*this._basicTablesService.getData().subscribe((data: any) => {
      
      data.sort(function(a, b) {
        a = new Date(a.dataInicio);
        b = new Date(b.dataInicio);
        return a>b ? -1 : a<b ? 1 : 0;
      });
    for( let i=0; data[i];i++){
      if(data[i].estado==0) {data[i].status='danger'; data[i].dstat='Waiting';}
      if(data[i].estado==1) {data[i].status='warning'; data[i].dstat='Processing';}
      if(data[i].estado==2) {data[i].status='success'; data[i].dstat='Done';}
      if(data[i].estado==3) {data[i].status='primary'; data[i].dstat='Rated';}
      if(data[i].estado==2 || data[i].estado==3){
        if(data[i].idPedido)this._basicTablesService.getData4(data[i].idPedido).subscribe((data4:any)=>{
          data[i].idReserva=data4.nrreserva;
          data[i].nome_cliente=data4.nome;
        });
        if(data[i].idPedido )this._basicTablesService.getData2(data[i].idservico).subscribe((data2: any) => {
          data[i].nome=data2;
        });
        if(data[i].idPedidoExterno) this._basicTablesService.getData2(data[i].serv).subscribe((data2: any) => {
          data[i].nome=data2;
        });
      }
    } 
    this.peopleTableData=data;
    });*/
    this.setClickedRow = function(index){
      this.selectedRow = index; 
      //document.getElementById(this.json.comments).style.display = 'block';
    }
  }

  ngOnInit(){
    setInterval(()=>{ 
    this._basicTablesService.getData().subscribe((data: any) => {
      
        data.sort(function(a, b) {
        a = new Date(a.dataInicio);
        b = new Date(b.dataInicio);
        return a>b ? -1 : a<b ? 1 : 0;
    });
    console.log("Request Service "+localStorage.getItem('idService'));
    //dataList: any[] = [];
    for( let i=0; data[i];i++){
      console.log("Num : "+data[i].idservico);
      if(Number(localStorage.getItem("idService"))==data[i].idservico){
        console.log("found...");
      }
    }
      for( let i=0; data[i];i++){
        if(Number(localStorage.getItem("idService"))==data[i].idservico){
        if(data[i].estado==0) {data[i].status='danger'; data[i].dstat='Waiting';}
        if(data[i].estado==1) {data[i].status='warning'; data[i].dstat='Processing';}
        if(data[i].estado==2) {data[i].status='success'; data[i].dstat='Done';}
        if(data[i].estado==3) {data[i].status='primary'; data[i].dstat='Rated';}
        //if(data[i].estado==2 || data[i].estado==3){
          if(data[i].idPedido)this._basicTablesService.getData4(data[i].idPedido).subscribe((data4:any)=>{
            data[i].idReserva=data4.nrreserva;
            data[i].nome_cliente=data4.nome;
          });
          if(data[i].idPedido)this._basicTablesService.getData2(localStorage.getItem("idService")).subscribe((data2: any) => {
            data[i].nome=data2;
          });
        }
        else{
          data[i]=null;
        }
      } 
      this.peopleTableData=data;
        });
    console.log("Requests : serviceId = "+localStorage.getItem('idService'));
  },2000)

  }
}
