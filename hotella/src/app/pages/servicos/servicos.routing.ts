import { Routes, RouterModule }  from '@angular/router';

import { Servicos } from './servicos.component';
import { ModuleWithProviders } from '@angular/core';
import {Restaurante} from './restaurante/restaurante.component';
import {Editar} from './editar/editar.component';
import { CriarCategoria } from './criarCategoria/criarCategoria.component';
import {EditarServico} from './editarServico/editarServico.component';


// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Servicos
  },
  
  { path: 'Editar', component: Editar },
  { path: 'CriarCategoria',component:CriarCategoria},
  { path: 'Restaurante', component: Restaurante,
  },
  { path: 'EditarServico', component: EditarServico,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
