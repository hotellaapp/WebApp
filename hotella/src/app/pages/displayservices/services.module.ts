import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { DataFilterPipe } from './components/dataTables/data-filter.pipe';
import { HotTable, HotTableModule } from 'ng2-handsontable';


import { routing }       from './services.routing';
import { Services } from './services.component';

import { Comment1 } from './servicecomments/comment.component';
import { CommentService } from './servicecomments/comment.service';

import { SmartTables } from './servicecategories/categories.component';
import { SmartTablesService } from './servicecategories/categories.service';

import { ShowService } from './showservices/service.component';
import { ShowServiceService } from './showservices/service.service';

import {BasicTablesService} from './requests/requests.service';
import {CondensedTable} from './requests/index';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    DataTableModule,
    HttpModule,
    HotTableModule,
  ],
  declarations: [
   Services,
   Comment1,
   SmartTables,
   ShowService,
   CondensedTable
  ],
  
  providers: [
    CommentService,
    SmartTablesService,
    ShowServiceService,
    BasicTablesService
  ]
})
export class ServicesModule {
	
}
