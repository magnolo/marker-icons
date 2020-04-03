import { TestBed } from '@angular/core/testing';

import { MarkerIconsService } from './marker-icons.service';

describe('MarkerIconsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkerIconsService = TestBed.get(MarkerIconsService);
    expect(service).toBeTruthy();
  });
});
