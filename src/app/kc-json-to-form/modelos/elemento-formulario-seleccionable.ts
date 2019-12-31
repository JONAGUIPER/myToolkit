import { ElementoFormularioBase, IElementoFormularioBase } from './elemento-formulario-base';
import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface ValorFijo {
    value: string;
    texto?: Map<string, string>;
}
export interface ParametroWS {
    nombreCampo?: string;
    valorFijo?: ValorFijo;
}
export interface Servicio {
    osbService: string;
    operation: string;
    method: string;
}
export interface Service {
    parametros: ParametroWS[];
    servicio: Servicio;
}
export interface CargarValores {
    valoresFijos?: ValorFijo;
    service?: Service;
}
export interface IElementoFormularioSeleccionable extends IElementoFormularioBase {
    cargarValores: CargarValores;
}
export class ElementoFormularioSeleccionable extends ElementoFormularioBase {
    cargarValores: CargarValores;

    constructor(options: IElementoFormularioSeleccionable = { cargarValores: {} }) {
        super(options);
        this.cargarValores = options.cargarValores;
    }
    setInputs<ElementoFormularioSeleccionable>(injector: Injector): ElementoFormularioSeleccionable {
        const dataElemento = super.setInputs<ElementoFormularioSeleccionable>(injector);
        this.populate(dataElemento);
        return dataElemento;
    }
    populate<ElementoFormularioSeleccionable>(options) {
        super.populate(options);
        this.cargarValores = options.cargarValores;
    }
}
