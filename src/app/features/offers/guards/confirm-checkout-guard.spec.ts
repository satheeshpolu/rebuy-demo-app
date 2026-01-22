import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { confirmCheckoutGuard } from './confirm-checkout-guard';

describe('confirmCheckoutGuard', () => {
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    route = {} as ActivatedRouteSnapshot;
    state = { url: '/check-out' } as RouterStateSnapshot;
  });

  it('should allow navigation when user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const result = confirmCheckoutGuard(route, state);

    expect(window.confirm).toHaveBeenCalledWith('Do you want to proceed to checkout?');
    expect(result).toBeTrue();
  });

  it('should block navigation when user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const result = confirmCheckoutGuard(route, state);

    expect(window.confirm).toHaveBeenCalled();
    expect(result).toBeFalse();
  });
});
