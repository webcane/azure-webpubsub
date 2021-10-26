import { TestBed } from '@angular/core/testing';

import { AzurePubSubService } from './azure-pub-sub.service';

describe('AzurePubSubService', () => {
  let service: AzurePubSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzurePubSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
