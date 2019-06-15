import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Funcionarios} from './funcionarios';



@Injectable()
export class AdminService {
    private baseUrl: string = 'https://hotella.herokuapp.com/api';

    
    constructor(private http : Http){

    }

    getFuncionarios() : Observable<Funcionarios[]> {

    return this.http.get(`${this.baseUrl}/utilizadores/all`).map((res:Response) =>res.json()).catch(handleError);
    }

    saveInformation(data):Observable<Funcionarios[]> {
   
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.baseUrl}/utilizadores/addFunc`, JSON.stringify(data),options)
        .catch(handleError);
        
      }
    deleteInformation(data):Observable<Funcionarios[]> {
       
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.baseUrl}/utilizadores/remove`,data['email'], options)
        .catch(handleError);
        
      }
      private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    
      updateInformation(data):Observable<Funcionarios[]>{
        
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return  this.http.post(`${this.baseUrl}/utilizadores/update`,JSON.stringify(data),options)
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