import { Routes, RouterModule }  from '@angular/router';

import { Services } from './services.component';
import { ModuleWithProviders } from '@angular/core';
//import { ShowServiceService } from './showservices/service.component';
//import { SmartTables } from './components/smartTables/smartTables.component';
import { SmartTables } from './servicecategories/categories.component';
import { Comment1 } from './servicecomments/comment.component';
import { ShowService } from './showservices/service.component';
import {CondensedTable} from './requests/requests.component';

export const routes: Routes = [
  {
    path: '',
    component: Services,
	  children: [
      //{ path: 'treeview', component: TreeViewComponent }
      //{ path: 'smarttables', component: SmartTables }
    ]
  }
  //,
  //{ path: 'EditarServico', component: ShowService},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
