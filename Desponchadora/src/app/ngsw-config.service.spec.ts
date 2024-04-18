import { TestBed } from '@angular/core/testing';

import { NgswConfigService } from './ngsw-config.service';

describe('NgswConfigService', () => {
  let service: NgswConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgswConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
