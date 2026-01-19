import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { offerResolverResolver } from './offer-resolver-resolver';

describe('offerResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => offerResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
