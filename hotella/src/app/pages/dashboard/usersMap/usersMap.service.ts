import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, layoutPaths} from '../../../theme';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsersMapService {
  
  private baseUrl: string = 'https://hotella.herokuapp.com/api';


  constructor(private http : Http) {
  }

  getData() {

    return this.http.get(`${this.baseUrl}/client/all`,{ headers: this.getHeaders()}).map((res: any) => res.json()).catch(handleError);
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
