import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";

import { HotTable, HotTableModule } from 'ng2-handsontable';
import { routing } from './informacoes.routing';

import { Informacoes } from './informacoes.component';
import { Inputs } from './components/inputs';

import { StandardInputs } from './components/inputs/components/standardInputs';
import { SmartTables } from './components/inputs/components/smartTables/smartTables.component';
import { SmartTablesService } from './components/inputs/components/smartTables/smartTables.service';
import { SmartTables2 } from './components/inputs/components/smartTables2/smartTables2.component';
import { SmartTables2Service } from './components/inputs/components/smartTables2/smartTables2.service';


@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    routing,
    Ng2SmartTableModule,

  ],
  declarations: [
    
    Inputs,
    Informacoes,
    StandardInputs,
    SmartTables,
	SmartTables2
   
  ],
  providers: [
    SmartTablesService,
	SmartTables2Service,
    
  ]
})
export class InformacoesModule {
}
