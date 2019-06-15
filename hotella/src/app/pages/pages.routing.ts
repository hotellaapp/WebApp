import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from './login/services/auth-guard.service';


export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'    },
      { path: 'servicos', loadChildren: './servicos/servicos.module#ServicosModule' },
	    { path: 'services', loadChildren: './displayservices/services.module#ServicesModule',canActivate: [  ] },
      { path: 'checkinout', loadChildren: './check/check.module#CheckModule'},
      { path: 'informacoes', loadChildren: './informacoes/informacoes.module#InformacoesModule'},
      { path: 'avaliacoes', loadChildren: './avaliacoes/avaliacoes.module#avaliacoesModule'},
      {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
	  {path: 'Charts', loadChildren: './charts/charts.module#ChartsModule'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
