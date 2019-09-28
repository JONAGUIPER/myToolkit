import { TestBed } from '@angular/core/testing';

import { FormGroupFactoryService } from './form-group-factory.service';

describe('FormGroupFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormGroupFactoryService = TestBed.get(FormGroupFactoryService);
    expect(service).toBeTruthy();
  });
});
