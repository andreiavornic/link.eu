import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAnalytics } from './link-analytics';

describe('LinkAnalytics', () => {
  let component: LinkAnalytics;
  let fixture: ComponentFixture<LinkAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkAnalytics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
