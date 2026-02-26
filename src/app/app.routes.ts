import {Routes} from '@angular/router';
import {NotFound} from './not-found/not-found';

export const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/home/home-module').then(m => m.HomeModule)},
  {path: 'my-links', loadChildren: () => import('./modules/my-links/my-links-module').then(m => m.MyLinksModule)},
  {path: '**', component: NotFound}
];

