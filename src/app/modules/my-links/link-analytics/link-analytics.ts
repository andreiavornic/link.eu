import {Component, inject, input, OnInit} from '@angular/core';
import {AnalyticsFacade} from '../data-access/analytics-facade';

@Component({
  selector: 'app-link-analytics',
  standalone: false,
  templateUrl: './link-analytics.html',
  styleUrl: './link-analytics.scss',
})
export class LinkAnalytics implements OnInit {
  facade = inject(AnalyticsFacade);
  id = input.required<string>();

  ngOnInit(): void {
    this.facade.load(this.id());
  }
}
