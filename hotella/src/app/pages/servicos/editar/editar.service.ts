import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Servico } from '.././servico';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Categoria } from '.././categoria';


@Injectable()
export class EditarService {
    private baseUrl: string = 'https://hotella.herokuapp.com/api';
    
    //servico : Servico ={idServico:-1,nome:"",preco:-1,estado:"",pedidosExternos: [],pedidos:[],id:-1};

    constructor(private http : Http){

    }

    getAll(): Observable<Categoria[]>{
          return this.http.get(`${this.baseUrl}/categoria/all`).map((res:Response) =>res.json()).catch(handleError);
       }

       getServico(): Observable<Servico[]>{
          return this.http.get(`${this.baseUrl}/servico/all`).map((res:Response) =>res.json()).catch(handleError);
       }   

       saveServico(data):Observable<Servico[]> {
      
        
          let headers = new Headers({ 'Content-Type': 'application/json'});
          let options = new RequestOptions({ headers: headers });
          return this.http.post(`${this.baseUrl}/servico/new`, JSON.stringify(data),options)
          .catch(handleError);
        
      
      }


      deleteServico(data):Observable<Servico[]> {
       
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(`${this.baseUrl}/servico/remove/`+data,options)
        .catch(handleError);
        
      }
    
      updateServico(data):Observable<Servico[]>{
       
        
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return  this.http.put(`${this.baseUrl}/servico/update/{id}`,JSON.stringify(data),options)
        .catch(handleError);
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