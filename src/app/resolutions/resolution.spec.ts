import { TestBed } from '@angular/core/testing';

import { Resolution } from './resolution';

describe('Resolution', () => {
  let service: Resolution;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Resolution);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
