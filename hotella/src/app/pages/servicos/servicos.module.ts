import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { HotTable, HotTableModule } from 'ng2-handsontable';

import {EditarServico} from './editarServico/editarServico.component';
import { Servicos } from './servicos.component';
import { routing }       from './servicos.routing';
//import {Piscina} from './piscina/piscina.component';
//import {Bicicleta} from './bicicletas/bicicleta.component';
import {Restaurante} from './restaurante/restaurante.component';
//import {Carne} from './restaurante/prato/carne/carne.component';
import {Editar} from './editar/editar.component';
import {CriarCategoria} from './criarCategoria/criarCategoria.component';


//import {PiscinaService} from './piscina/piscina.service';
//import {BicicletaService} from './bicicletas/bicicleta.service';
//import {CarneService} from './restaurante/prato/carne/carne.service';
import {EditarService} from './editar/editar.service';
import {ServicoService} from './servicos.service';
import {CriarCategoriaService} from './criarCategoria/criarCategoria.service';
import {RestauranteService} from './restaurante/restaurante.service';
import {EditarServicoService} from './editarServico/editarServico.service';

//import {BicicletaFilterPipe} from './bicicletas/data-filter.pipe';



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
   Servicos,
   //Piscina,
   //Bicicleta,
   //BicicletaFilterPipe
   Restaurante,
   //Carne,
   Editar,
   CriarCategoria,
   EditarServico

    
  
  ],
  
  providers: [
    //PiscinaService,
    //BicicletaService,
    //CarneService,
    EditarService,
    ServicoService,
    CriarCategoriaService,
    RestauranteService,
    EditarServicoService
    

  ]
})
export class ServicosModule {}
