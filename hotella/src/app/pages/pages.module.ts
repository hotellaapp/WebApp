import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { AuthGuardService } from './login/services/auth-guard.service';
import { AuthService } from './login/services/auth.service';
import { Pages } from './pages.component';
@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages],
  providers: [ 
    AuthService,
    AuthGuardService
],
})
export class PagesModule {
}
