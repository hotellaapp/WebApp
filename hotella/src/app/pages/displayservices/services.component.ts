import {Component,OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';
import {Json} from './json';

@Component({
  selector: 'services',
  templateUrl:'./services.html',
  styleUrls: ['./services.scss']
})
export class Services {
    json :Json;
    constructor() {
    this.json=new Json();
  }
 
}
