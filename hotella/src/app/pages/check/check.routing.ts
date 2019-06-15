import { Routes, RouterModule }  from '@angular/router';

import { Check } from './check.component';
import { Buttons } from './components/buttons/buttons.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Buttons,
    
  }
];

export const routing = RouterModule.forChild(routes);
