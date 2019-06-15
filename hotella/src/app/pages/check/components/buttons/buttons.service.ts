import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Codigo } from '../../../codigo';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ButtonsService {
    private baseUrl: string = 'https://hotella.herokuapp.com/api';

    constructor(private http : Http){
    }
    
    getCodigo(idReserva: string, nacionalidade: string,cliente: string): Observable<Codigo[]>{
        //A nacionalidade esta a enviar o codigo, i.e., Portugal = PT
        //Alterar endereço

        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
        return this.http.post(`${this.baseUrl}/client/checkin`,JSON.stringify({nrreserva:idReserva ,nacionalidade:  nacionalidade,nome:cliente}),options).map((res:Response) =>res).catch(handleError);
    }

    cancelaCodigo(idReserva: string): Observable<Codigo[]>{
        //Alterar endereço

        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
        return this.http.post(`${this.baseUrl}/client/checkout`,JSON.stringify({nrreserva:idReserva}),options).map((res:Response) =>res).catch(handleError);
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