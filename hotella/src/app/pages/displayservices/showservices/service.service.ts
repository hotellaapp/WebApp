import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Service } from './servico';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Categoria} from '../servicecategories/categoria';

@Injectable()
export class ShowServiceService {
  
  private baseUrl: string = 'https://hotella.herokuapp.com/api';

  constructor(private http : Http){

  }

  smartTableData = [
  ];

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  //BEING USED
  getAllCategorie(): Observable<Categoria[]>{
    return this.http.get(`${this.baseUrl}/categoria/all`).map((res:Response) =>res.json()).catch(handleError);
  }

  getCategorieById(x): Observable<Categoria[]>{
    return this.http.get(`${this.baseUrl}/categoria/`+x,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);
  }

  saveService(data):Observable<Service[]> {    
    console.log(data);  
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/servico/new`, JSON.stringify(data),options)
    .catch(handleError);
  }

  deleteServico(id)  :Observable<Service[]> {
    console.log("Service : "+id);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(`${this.baseUrl}/servico/remove/`+id,options).
    catch(handleError);  
  }

  updateCategoria(id,data):Observable<Service[]>{
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return  this.http.put(`${this.baseUrl}/servico/update/`+id,JSON.stringify(data),options)
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