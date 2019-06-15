import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Categoria } from './categoria';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class SmartTablesService {
  
  private baseUrl: string = 'https://hotella.herokuapp.com/api';

  constructor(private http : Http){

  }

  smartTableData = [
   
  ];

  metricsTableData = [
    
  ];

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  getData4(x): Observable<any>{
    return this.http.get(`${this.baseUrl}/categoria/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
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

  deleteCategorie(id)  :Observable<Categoria[]> {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});
    return this.http.put(`${this.baseUrl}/categoria/remove/`+id,options).
    catch(handleError); 
  }

  updateCategoria(id,data):Observable<Categoria[]>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return  this.http.put(`${this.baseUrl}/categoria/update/`+id,JSON.stringify(data),options)
    .catch(handleError);
  }  

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.smartTableData);
      }, 2000);
    });
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