import { TestBed } from '@angular/core/testing';

import { MyLinksService } from './my-links-service';

describe('MyLinksService', () => {
  let service: MyLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
