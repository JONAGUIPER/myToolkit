import { ElementoFormularioBase, IElementoFormularioBase } from './elemento-formulario-base';

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

    constructor(options: IElementoFormularioSeleccionable = {cargarValores: {}}) {
        super(options);
        this.cargarValores = options.cargarValores;
    }
}
