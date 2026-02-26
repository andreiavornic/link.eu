import { TestBed } from '@angular/core/testing';

import { LinkGenerator } from './link-generator';

describe('LinkGenerator', () => {
  let service: LinkGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
