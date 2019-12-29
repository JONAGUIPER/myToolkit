import { ElementoFormularioSeleccionable } from './elemento-formulario-seleccionable';

describe('ElementoFormulariSeleccionable', () => {
  it('se crea una instancia vacia', () => {
    const elementoSeleccionable = new ElementoFormularioSeleccionable();
    expect(elementoSeleccionable).toBeTruthy();
  });
  it('se crea una instancia con los valores obligatorios', () => {
    const objetoX = {
      name: 'inputTest',
      texto: 'label del elemento',
      value: 'valor por Defecto',
      cargarValores: {
        service: {
          servicio: {
            operation: 'buscarID',
            method: 'GET',
            osbService: 'creoOpcional'
          },
          parametros: [
            { nombreCampo: 'campoParametro1' }
          ]
        },
      }
    };
    const elementoSeleccionable = new ElementoFormularioSeleccionable(objetoX);
    expect(elementoSeleccionable.name).toEqual(objetoX.name);
    expect(elementoSeleccionable.cargarValores.service).toEqual(objetoX.cargarValores.service);
  });
});
