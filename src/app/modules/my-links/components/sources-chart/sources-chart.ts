import {Component, computed, input} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';

@Component({
  selector: 'app-sources-chart',
  standalone: false,
  templateUrl: './sources-chart.html',
  styleUrl: './sources-chart.scss',
})
export class SourcesChart {
  sources = input.required<Array<{ source: string; value: number }>>();

  private colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];

  public barChartType: ChartType = 'bar';

  public barChartData = computed<ChartConfiguration['data']>(() => ({
    datasets: [
      {
        data: this.sources().map(d => d.value),
        backgroundColor: this.sources().map((_, i) => this.colors[i % this.colors.length]),
      },
    ],
    labels: this.sources().map(d => d.source),
  }));

  public barChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
}
