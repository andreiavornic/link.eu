import {Component, computed, input} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';

@Component({
  selector: 'app-visitors-chart',
  standalone: false,
  templateUrl: './visitors-chart.html',
  styleUrl: './visitors-chart.scss',
})
export class VisitorsChart {
  visitors = input.required<{ unique: number; returning: number }>();

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData = computed<ChartConfiguration['data']>(() => ({
    datasets: [
      {
        data: [this.visitors().unique, this.visitors().returning],
        backgroundColor: ['#22c55e', '#f59e0b'],
        hoverBackgroundColor: ['#16a34a', '#d97706'],
      },
    ],
    labels: ['Unique', 'Returning'],
  }));

  public doughnutChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
}
