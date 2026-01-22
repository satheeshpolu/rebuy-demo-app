import { CanActivateFn } from '@angular/router';

export const confirmCheckoutGuard: CanActivateFn = (route, state) => {
  return window.confirm('Do you want to proceed to checkout?');
};
