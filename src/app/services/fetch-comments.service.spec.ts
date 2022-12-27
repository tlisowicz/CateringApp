import { TestBed } from '@angular/core/testing';

import { FetchCommentsService } from './fetch-comments.service';

describe('FetchCommentsService', () => {
  let service: FetchCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
