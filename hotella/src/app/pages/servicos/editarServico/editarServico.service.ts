import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Servico} from '../servico';


@Injectable()
export class EditarServicoService {
    private baseUrl: string = 'https://hotella.herokuapp.com/api';
    

    constructor(private http : Http){

    }

    getServicoID(id): Observable<Servico>{
        return this.http.get(`${this.baseUrl}/servico/`+id).map((res:Response) =>res.json()).catch(handleError);
     }

     getServicos(): Observable<Servico[]>{


        return this.http.get(`${this.baseUrl}/servico/all`).map((res:Response) =>res.json()).catch(handleError);
    }   

    getTamanho(): Observable<number>{


        return this.http.get(`${this.baseUrl}/servico/quantos`).map((res:Response) =>res.json()).catch(handleError);
       }

   
       updateServico(data):Observable<Servico[]>{
       
       
        
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return  this.http.put(`${this.baseUrl}/servico/update`,JSON.stringify(data),options)
        .catch(handleError);
      }  

}

function handleError (error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`;
    console.error(errorMsg);
  
    // throw an application level error
    return Observable.throw(errorMsg);
  }