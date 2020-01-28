import { ElementoFormularioBase } from './elemento-formulario-base';

describe('DataElementoFormularioModel', () => {
  it('should create an instance', () => {
    expect(new ElementoFormularioBase(
      {
        name: 'inputTest',
        texto: 'label del elemento',
        value: 'valor por Defecto'
      }
    )).toBeTruthy();
  });
});
