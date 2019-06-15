import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { HotTable, HotTableModule } from 'ng2-handsontable';


import {Admin} from './admin.component';
import {routing} from'./admin.routing';

import {AdminService} from './admin.service';




@NgModule({
    imports: [CommonModule,
        FormsModule,
        NgaModule,
        Ng2SmartTableModule,
        DataTableModule,
        HttpModule,
        routing

    ],
    declarations: [Admin],
    providers: [AdminService]
  })
  export class AdminModule {
  }