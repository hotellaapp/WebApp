import { Routes, RouterModule }  from '@angular/router';

import { Inputs } from './components/inputs/inputs.component';

const routes: Routes = [
  {
    path: '',
    component: Inputs,
  }
];

export const routing = RouterModule.forChild(routes);
