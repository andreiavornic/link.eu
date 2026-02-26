import {NgModule} from '@angular/core';
import {MyLinksRoutingModule} from './my-links-routing-module';
import {SharedModule} from '../../shared/shared-module';
import {MyLinks} from './my-links';
import {EmptyState} from './components/empty-state/empty-state';
import {LinksTable} from './components/links-table/links-table';
import {LinkAnalytics} from './link-analytics/link-analytics';
import {KpiCards} from './components/kpi-cards/kpi-cards';
import {TrendChart} from './components/trend-chart/trend-chart';
import {DeviceChart} from './components/device-chart/device-chart';
import {SourcesChart} from './components/sources-chart/sources-chart';
import {VisitorsChart} from './components/visitors-chart/visitors-chart';
import { provideCharts } from 'ng2-charts';
import {
  BarController, BarElement,
  LineController, LineElement,
  PointElement,
  LinearScale, CategoryScale,
  ArcElement, DoughnutController,
  Colors, Legend, Tooltip, Filler
} from 'chart.js';

@NgModule({
  declarations: [
    MyLinks,
    EmptyState,
    LinksTable,
    LinkAnalytics,
    KpiCards,
    TrendChart,
    DeviceChart,
    SourcesChart,
    VisitorsChart,
  ],
  imports: [
    SharedModule,
    MyLinksRoutingModule
  ],
  providers: [
    provideCharts({
      registerables: [
        BarController, BarElement,
        LineController, LineElement,
        PointElement,
        LinearScale, CategoryScale,
        ArcElement, DoughnutController,
        Colors, Legend, Tooltip, Filler
      ]
    })
  ]
})
export class MyLinksModule {
}

