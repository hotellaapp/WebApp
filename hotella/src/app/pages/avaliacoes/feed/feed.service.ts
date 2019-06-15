import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FeedService {

  private baseUrl: string = 'https://hotella.herokuapp.com/api';
  
      constructor(private http : Http){
      }
      
    getData(): Observable<any>{
      let feed$=this.http.get(`${this.baseUrl}/avaliacao/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
      return feed$;
    }

    getData2(data): Observable<any>{
      let feed$=this.http.get(`${this.baseUrl}/avaliacao/`+data.idAvaliacao+`/cliente`,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);
      return feed$;
    }

    getData3(x): Observable<any>{
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
  //console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
