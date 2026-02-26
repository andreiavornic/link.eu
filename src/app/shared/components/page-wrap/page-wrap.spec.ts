import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWrap } from './page-wrap';

describe('PageWrap', () => {
  let component: PageWrap;
  let fixture: ComponentFixture<PageWrap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageWrap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageWrap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
