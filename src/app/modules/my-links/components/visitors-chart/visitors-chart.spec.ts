import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsChart } from './visitors-chart';

describe('VisitorsChart', () => {
  let component: VisitorsChart;
  let fixture: ComponentFixture<VisitorsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
