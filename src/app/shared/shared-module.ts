import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseChartDirective} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TopNav} from './components/top-nav/top-nav';
import {PageWrap} from './components/page-wrap/page-wrap';
import {ErrorMsg} from './components/error-msg/error-msg';


@NgModule({
  declarations: [
    TopNav, PageWrap, ErrorMsg
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BaseChartDirective,
    MatInputModule,
    MatButton,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    TopNav,
    PageWrap,
    ErrorMsg,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BaseChartDirective,
    MatInputModule,
    MatButton,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class SharedModule {
}
