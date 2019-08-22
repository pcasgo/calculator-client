import { TestBed } from '@angular/core/testing';

import { CalcFormService } from './calc-form.service';

describe('CalcFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalcFormService = TestBed.get(CalcFormService);
    expect(service).toBeTruthy();
  });
});
