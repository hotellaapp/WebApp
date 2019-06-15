import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import { Service } from '../showservices/servico';

@Injectable()
export class BasicTablesService {

  smartTablePageSize = 10;

  smartTableData = [
  ];

  editableTableData: Array<any>;

  peopleTableData = [
  ];

  metricsTableData = [
  ];

  users = [
  ];

  statuses = [
  ];

  groups = [
  ];

  private baseUrl: string = 'https://hotella.herokuapp.com/api';
  
      constructor(private http : Http){
      }
      
      getServiceById(x): Observable<Service>{
        return this.http.get(`${this.baseUrl}/servico/`+x,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);
      }

    getData(): Observable<any>{
      const pedido=this.http.get(`${this.baseUrl}/pedido/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
      //const pedidos=this.http.get(`${this.baseUrl}/pedidoexterno/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
      return Observable.forkJoin([pedido]).map(responses => {
        return [].concat(...responses);
     });
    }

    getDataByServiceId(): Observable<any>{
      const pedido=this.http.get(`${this.baseUrl}/pedido/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
      //const pedidos=this.http.get(`${this.baseUrl}/pedidoexterno/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
      return Observable.forkJoin([pedido]).map(responses => {
        return [].concat(...responses);
     });
    }

    getData2(x): any{
      return this.http.get(`${this.baseUrl}/servico/nome/`+x,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);

    }

    getData3(): Observable<any>{
      return this.http.get(`${this.baseUrl}/client/all/`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);

    }
    getData4(x): Observable<any>{
      return this.http.get(`${this.baseUrl}/client/infopedido=`+x,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);

    }

    updateP(item): Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.baseUrl}/pedido/updateEstado/`+item.idPedido,JSON.stringify(item.estado),options).catch(handleError);
    }

    updatePE(item): Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this.http.put(`${this.baseUrl}/pedidoexterno/updateEstado/`+item.idPedidoExterno,JSON.stringify(item.estado),options).catch(handleError);
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
  //console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
