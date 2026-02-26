import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyLinks} from './my-links';
import {LinkAnalytics} from './link-analytics/link-analytics';

const routes: Routes = [{
  path: '',
  component: MyLinks
}, {
  path: ':id',
  component: LinkAnalytics
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyLinksRoutingModule {
}

