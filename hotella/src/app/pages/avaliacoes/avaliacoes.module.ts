import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { avaliacoes } from './avaliacoes.component';
import { routing } from './avaliacoes.routing';
import { Feed } from './feed';
import { FeedService } from './feed/feed.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    Feed,
    avaliacoes
  ],
  providers: [
    FeedService,
  ]
})
// tslint:disable-next-line:class-name
export class avaliacoesModule {

}
