import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PieChartService {

  private baseUrl: string = 'https://hotella.herokuapp.com/api';
  
  constructor(private _baConfig:BaThemeConfigProvider, private http : Http) {
  }

  getData3() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return this.http.get(`${this.baseUrl}/avaliacao/media`,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);
  }

  getData2() {
    return this.http.get(`${this.baseUrl}/pedidoexterno/clientesexternos`,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);
  }

  getData1() {
    return this.http.get(`${this.baseUrl}/client/hospedes`,{ headers: this.getHeaders()}).map((res: any) => res.text()).catch(handleError);
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
