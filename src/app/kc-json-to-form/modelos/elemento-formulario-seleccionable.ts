import { ElementoFormularioBase, IElementoFormularioBase } from './elemento-formulario-base';
import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IdiomasEnum, idiomas } from '../enumeradores/idiomas-enum.enum';
import { CargarValores } from './interfaces';


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
        const dataElemento: ElementoFormularioSeleccionable = super.setInputs<ElementoFormularioSeleccionable>(injector);
        this.populate(dataElemento);
        return dataElemento;
    }
    populate<ElementoFormularioSeleccionable>(options) {
        super.populate(options);
        this.cargarValores = options.cargarValores;
    }
}
