export interface I18n {
    idioma: string;
    value: string;
}
export interface ValorFijoSeleccionable {
    value: string;
    texto?: I18n[];
}
export interface ParametroWS {
    nombreParametro: string;
    nombreCampo?: string;
    valorFijo?: string;
}
export interface Servicio {
    url: string;
    operation: string;
}
export interface Service {
    parametros?: ParametroWS[];
    servicio: Servicio;
    respuesta?: Opcion;
}
export interface CargarValores {
    valoresFijos?: ValorFijoSeleccionable[];
    service?: Service;
}

export interface Opcion {
    value: string;
    caption: string;
}
