import {Component, computed, input} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';

@Component({
  selector: 'app-device-chart',
  standalone: false,
  templateUrl: './device-chart.html',
  styleUrl: './device-chart.scss',
})
export class DeviceChart {
  devices = input.required<Array<{ type: string; value: number }>>();

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData = computed<ChartConfiguration['data']>(() => ({
    datasets: [
      {
        data: this.devices().map(d => d.value),
        backgroundColor: ['#6366f1', '#f59e0b'],
        hoverBackgroundColor: ['#4f46e5', '#d97706'],
      },
    ],
    labels: this.devices().map(d => d.type),
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
