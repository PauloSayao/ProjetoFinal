import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usuariosGuard } from './usuarios.guard';

describe('usuariosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usuariosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
