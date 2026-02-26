import {Component, input} from '@angular/core';
import {Analytics} from '../../../../core/models/analytics.model';

@Component({
  selector: 'app-kpi-cards',
  standalone: false,
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.scss',
})
export class KpiCards {
  data = input.required<Analytics>();
}
