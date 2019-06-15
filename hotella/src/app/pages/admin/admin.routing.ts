import { Routes, RouterModule }  from '@angular/router';

import { Admin } from './admin.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from '../login/services/auth-guard.service';

export const routes: Routes = [
    {
      path: '',
      component: Admin,
      canActivateChild: [ AuthGuardService ],			

    },

]
;

export const routing: ModuleWithProviders = RouterModule.forChild(routes);