import {Component} from '@angular/core';
import {FeedService} from './feed.service';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss']
})

export class Feed implements OnInit{

  feed: Array<Object>;
  errorMessage: string = '';

  constructor(private _feedService:FeedService) {
    this._feedService.getData().subscribe(data => {
      data.sort(function(a, b) {
        return b.data > a.data;
    });
      for( let i=0; data[i];i++){
        var agodesc='min atrás';
        var agora = Date.now();
        var minago=Math.round((agora - data[i].data)/60000); //minutos
        if(minago>60) {//horas
          minago= Math.round(minago/60);
          agodesc='h atrás';
        } 
        if(minago>24) {//dias
          minago= Math.round(minago/24); 
          agodesc='d atrás'
        }
        if(minago>31) {//meses
          minago= Math.round(minago/31); 
          agodesc='m atrás'
        }
        data[i].texto='"'+data[i].texto+'"';
        data[i].ago = minago;
        data[i].type='text-message';
        //data[i].header=data[i]['pedido'].descricao;
        data[i].agod=agodesc;

        this._feedService.getData2(data[i]).subscribe((data2:any) => {
        data[i].name=data2;
        });

        this._feedService.getData3(data[i]['pedido'].idservico).subscribe((data3:any)=>{
          data[i].header=data3;
        });
    }
    this.feed=data;
    });
  }

  ngOnInit() {
    setInterval(()=>{ 
    this._feedService.getData().subscribe(data => {
      data.sort(function(a, b) {
        return b.data > a.data;
    });
      for( let i=0; data[i];i++){
        var agodesc='min atrás';
        var agora = Date.now();
        var minago=Math.round((agora - data[i].data)/60000); //minutos
        if(minago>60) {//horas
          minago= Math.round(minago/60);
          agodesc='h atrás';
        } 
        if(minago>24) {//dias
          minago= Math.round(minago/24); 
          agodesc='d atrás'
        }
        if(minago>31) {//meses
          minago= Math.round(minago/31); 
          agodesc='m atrás'
        }
        data[i].texto='"'+data[i].texto+'"';
        data[i].ago = minago;
        data[i].type='text-message';
        //data[i].header=data[i]['pedido'].descricao;
        data[i].agod=agodesc;

        this._feedService.getData2(data[i]).subscribe((data2:any) => {
        data[i].name=data2;
        });

        this._feedService.getData3(data[i]['pedido'].idservico).subscribe((data3:any)=>{
          data[i].header=data3;
        });
    }
    if (this.feed.length!==data.length) this.feed=data;
    });
},10000) 
  }

  expandMessage (message){
    message.expanded = !message.expanded;
    
 
  }

}
