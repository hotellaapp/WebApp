import {Component, Input, SimpleChange} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnInit,OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import {BasicTablesService} from '../../basicTables.service';

@Component({
  selector: 'condensed-table',
  templateUrl: './condensedTable.html'
})

export class CondensedTable implements OnInit{

   peopleTableData:Array<any>;
   peopleTableData2:Array<any>;
  errorMessage: string = '';


  
  constructor(private _basicTablesService: BasicTablesService) {
    this._basicTablesService.getData().subscribe((data: any) => {
      
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

this.peopleTableData=data;

  });
  }

  ngOnInit(){

    setInterval(()=>{ 
    this._basicTablesService.getData().subscribe((data: any) => {
      
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
  
if(this.peopleTableData.length!==data.length) {this.peopleTableData=data;}
    });
  },10000)

  }
  

  public open(item) {
    var x=0;
    if(item.estado==0 && !x) {
      item.estado=1;
      item.status='warning';
      item.dstat='Processing';
      x=1;
      if(item.idPedido)this._basicTablesService.updateP(item).subscribe();
      if(item.idPedidoExterno) this._basicTablesService.updatePE(item).subscribe();
    }

    if(item.estado==1 && !x) {
      item.estado=2;
      item.status='success';
      item.dstat='Done';
      x=1;
      if(item.idPedido)this._basicTablesService.updateP(item).subscribe();
      if(item.idPedidoExterno) this._basicTablesService.updatePE(item).subscribe();
    }
  }

  

}
