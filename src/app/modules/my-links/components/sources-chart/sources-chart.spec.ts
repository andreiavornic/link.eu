import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesChart } from './sources-chart';

describe('SourcesChart', () => {
  let component: SourcesChart;
  let fixture: ComponentFixture<SourcesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourcesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourcesChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
