import {Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {BaMsgCenterService} from './baMsgCenter.service';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

  public notifications:Array<Object>;
  public messages:Array<Object>;
  private temp
   
  constructor(private _baMsgCenterService:BaMsgCenterService) {
   
    this.notifications=[]
    this.notifications[0]=new Array<Object>();

      setInterval(()=>{
        this._baMsgCenterService.getData().subscribe((data: any) => {
          for( let i=0; data[i];i++){
            if(data[i].estado==0){
                this._baMsgCenterService.getData2(data[i].idservico).subscribe((data2: any) => {
                
                data[i].servico=data2;
                this.temp.push(data[i])
              });
            }
          }
          
          if(this.temp){
            this.temp.sort(function(a, b) {
              a=a.idPedido;
              b=b.idPedido;
              return a>b ? -1 : a<b ? 1 : 0;
          });
            this.notifications[0]=this.temp;}
          this.temp=[]
      
         });
      
        
      },5000)
    }

}
