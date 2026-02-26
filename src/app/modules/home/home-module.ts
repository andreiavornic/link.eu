import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing-module';
import {UrlForm} from './components/url-form/url-form';
import {SharedModule} from '../../shared/shared-module';
import {ResultCard} from './components/result-card/result-card';
import {Home} from './home';


@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    Home,
    UrlForm,
    ResultCard
  ],
})
export class HomeModule {
}
