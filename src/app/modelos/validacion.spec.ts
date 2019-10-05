import { Validacion } from './validacion';
import { assertPlatform } from '@angular/core';

describe('Validacion', () => {
  it('should create an instance', () => {
    expect(new Validacion()).toBeTruthy();
  });

  it('should con valores', () => {
    let options = { tipoValidacion: 'required', parametros: ['param1'] };
    const validacion = new Validacion(options);
    expect(validacion.tipoValidacion).toBe(options.tipoValidacion);
    expect(validacion.parametros).toBe(options.parametros);
  });
});
