import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export class DataElementoFormularioModel<T> {
    value: T;
    name: string;
    texto: string;
    tipoElemento: string;
    obligatorio: boolean;

    etiquetaAyuda: string;
    saltoLinea: boolean;
    enLinea: boolean;
    valorPorDefecto: T;
    habilitado: boolean;
    validaciones: any;
    accionesCondicionales: any;
    formato: any;

    constructor(options: {
        value?: T,
        name?: string,
        texto?: string,
        tipoElemento?: string,
        obligatorio?: boolean,

        etiquetaAyuda?: string,
        saltoLinea?: boolean,
        enLinea?: boolean,
        valorPorDefecto?: T,
        habilitado?: boolean,
        // TODO: crear los modelos correspondientes
        validaciones?: any,
        accionesCondicionales?: any,
        formato?: any

    } = {}) {
        this.value = options.value;
        this.name = options.name || '';
        this.texto = options.texto || '';
        this.tipoElemento = options.tipoElemento || '';
        this.obligatorio = !!options.obligatorio;

        this.etiquetaAyuda = options.etiquetaAyuda || '';
        this.saltoLinea = options.saltoLinea || false;
        this.enLinea = options.enLinea || true;
        this.valorPorDefecto = options.valorPorDefecto || null;
        this.habilitado = options.habilitado || true;
        // TODO: crear los modelos correspondientes
        this.validaciones = options.validaciones || null;
        this.accionesCondicionales = options.accionesCondicionales || null;
        this.formato = options.formato || '';
    }



    // buildWithTexto(texto: string): DataElementoFormularioModel<T> {
    //     this.texto = texto;
    //     return this;
    // }

    // buildWithValue(value: T): DataElementoFormularioModel<T> {
    //     this.value = value;
    //     return this;
    // }

    // buildWithName(name: string): DataElementoFormularioModel<T> {
    //     this.name = name;
    //     return this;
    // }



}
