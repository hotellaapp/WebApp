import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RestauranteRecebe} from './restaurante';

@Injectable()
export class RestauranteService {
    private baseUrl: string = 'https://hotella.herokuapp.com/api';
    
    constructor(private http : Http){

    }

    getMenu(): Observable<RestauranteRecebe[]>{
        return this.http.get(`${this.baseUrl}/menu/all`).map((res:Response) =>res.json()).catch(handleError);
     }

    saveMenu(data):Observable<RestauranteRecebe[]> {
      
        
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.baseUrl}/menu/add`, JSON.stringify(data),options)
        .catch(handleError);
      
    }

 
    deleteMenu(idMenu):Observable<RestauranteRecebe[]> {
     
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers});
      return this.http.put(`${this.baseUrl}/menu/remove/`+idMenu,options)
      .catch(handleError);
      
    }
  
    updateMenu(data):Observable<RestauranteRecebe[]>{
     
      
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return  this.http.put(`${this.baseUrl}/menu/update`,JSON.stringify(data),options)
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