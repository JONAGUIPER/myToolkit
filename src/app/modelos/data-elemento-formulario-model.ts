import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export class DataElementoFormularioModel {
    value: any;
    name: string;
    texto: string;
    tipoElemento: string;
    obligatorio: boolean;
    elementosGrupo?: any[];

    etiquetaAyuda: string;
    saltoLinea: boolean;
    enLinea: boolean;
    valorPorDefecto: any;
    habilitado: boolean;
    validaciones: any;
    accionesCondicionales: any;
    formato: any;

    constructor(options: {
        value?: any,
        name?: string,
        texto?: string,
        tipoElemento?: string,
        obligatorio?: boolean,
        elementosGrupo?: any[],

        etiquetaAyuda?: string,
        saltoLinea?: boolean,
        enLinea?: boolean,
        valorPorDefecto?: any,
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
        this.elementosGrupo = options.elementosGrupo;

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
