import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Categoria } from '.././categoria';


@Injectable()
export class CriarCategoriaService {
    private baseUrl: string = 'https://hotella.herokuapp.com/api';
    

    constructor(private http : Http){

    }

    getAll(): Observable<Categoria[]>{
        return this.http.get(`${this.baseUrl}/categoria/all`).map((res:Response) =>res.json()).catch(handleError);
     }

     saveCategoria(data):Observable<Categoria[]> {
      
        
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.baseUrl}/categoria/new`, JSON.stringify(data),options)
        .catch(handleError);
      
    
    }

  
    
    deleteCategoria(data)  :Observable<Categoria[]> {
       
      
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers});
      return this.http.put(`${this.baseUrl}/categoria/remove/`+data,options).
      catch(handleError);
        
    }
    
    
      updateCategoria(data):Observable<Categoria[]>{
       
       
        
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return  this.http.put(`${this.baseUrl}/categoria/update`,JSON.stringify(data),options)
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