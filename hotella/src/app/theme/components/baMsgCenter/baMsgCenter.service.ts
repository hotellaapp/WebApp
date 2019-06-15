import {Injectable} from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class BaMsgCenterService {
  private baseUrl: string = 'https://hotella.herokuapp.com/api';
  
  constructor(private http : Http){

  }
  private _notifications = [
    
];

  public getNotifications():Array<Object>{

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    
		
    this.http.get(`${this.baseUrl}/pedido/estado=0`).map((res:Response) =>{
      this._notifications=[]
      this._notifications.push(res.json());
    }).subscribe()
    return this._notifications;

    //this.http.get(`${this.baseUrl}/pedido/estado=0`).map((res:Response) =>res.json()).catch(handleError);
     
  }
  getData(): Observable<any>{
    const pedido=this.http.get(`${this.baseUrl}/pedido/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
    const pedidos=this.http.get(`${this.baseUrl}/pedidoexterno/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
    return Observable.forkJoin([pedido, pedidos]).map(responses => {
      return [].concat(...responses);
   });
  }

  getData2(x): Observable<any>{
    return this.http.get(`${this.baseUrl}/servico/nome/`+x,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);

  }
  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}


function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
