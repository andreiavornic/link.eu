import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMsg } from './error-msg';

describe('ErrorMsg', () => {
  let component: ErrorMsg;
  let fixture: ComponentFixture<ErrorMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMsg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
