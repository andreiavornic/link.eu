import {Component, computed, input} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';

@Component({
  selector: 'app-trend-chart',
  standalone: false,
  templateUrl: './trend-chart.html',
  styleUrl: './trend-chart.scss',
})
export class TrendChart {
  trend = input.required<Array<{ date: string; clicks: number }>>();
  public lineChartType: ChartType = 'line';

  public lineChartData = computed<ChartConfiguration['data']>(() => ({
    datasets: [
      {
        data: this.trend().map((t) => t.clicks),
        label: 'Clicks',
        backgroundColor: 'rgba(44,148,176,0.2)',
        borderColor: '#2C94B0',
        pointBackgroundColor: '2C94B0',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(44,148,176,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.trend().map((t) => t.date),
  }));

  public lineChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
    },
    plugins: {
      legend: { display: false },
    },
  };
}
