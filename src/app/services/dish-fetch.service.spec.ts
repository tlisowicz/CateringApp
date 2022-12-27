import { TestBed } from '@angular/core/testing';

import { DishFetchService } from './dish-fetch.service';

describe('DishServiceService', () => {
  let service: DishFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
