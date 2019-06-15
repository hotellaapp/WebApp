import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Informacao } from '../../../../../informacao';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SmartTablesService {

  private baseUrl: string = 'https://hotella.herokuapp.com/api';

    constructor(private http : Http){
    }
    
  getAll(): Observable<Informacao[]>{

   return this.http.get(`${this.baseUrl}/informacao/all`).map((res:Response) =>res.json()).catch(handleError);
  }

  saveInformation(data):Observable<Informacao[]> {
   
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/informacao/new`, JSON.stringify(data),options)
    .catch(handleError);
    
  }
  deleteInformation(data):Observable<Informacao[]> {
   
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers,
      body: JSON.stringify(data)
     });
    return this.http.delete(`${this.baseUrl}/informacao/remove`, options)
    .catch(handleError);
    
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
}
  updateInformation(data):Observable<Informacao[]>{
   
    
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return  this.http.put(`${this.baseUrl}/informacao/update/{id}`,JSON.stringify(data),options)
    .catch(handleError);
  }
 

}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}