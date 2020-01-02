export interface I18n {
    idioma: string;
    value: string;
}
export interface ValorFijo {
    value: string;
    texto?: I18n[];
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
    valoresFijos?: ValorFijo[];
    service?: Service;
}

export interface Opcion {
    value: string;
    caption: string;
  }