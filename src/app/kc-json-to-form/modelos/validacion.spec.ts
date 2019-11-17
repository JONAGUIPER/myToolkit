import { Validacion } from './validacion';
import { assertPlatform } from '@angular/core';

describe('Validacion', () => {


  it('should con valores', () => {
    const options: Validacion = { tipoValidacion: 'required', parametros: ['param1'] };
    const validacion: Validacion = (options);
    expect(validacion.tipoValidacion).toBe(options.tipoValidacion);
    expect(validacion.parametros).toBe(options.parametros);
  });
});
