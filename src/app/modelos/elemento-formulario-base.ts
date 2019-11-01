import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Validacion } from './validacion';

export class ElementoFormularioBase {
    value: any;
    name: string;
    texto: string;
    tipoElemento: string;
    elementosGrupo: any[];

    etiquetaAyuda: string;
    saltoLinea: boolean;
    enLinea: boolean;
    valorPorDefecto: any;
    habilitado: boolean;
    validaciones: Validacion[];
    accionesCondicionales: any;
    formato: any;

    constructor(options: {
        value?: any,
        name?: string,
        texto?: string,
        tipoElemento?: string,
        elementosGrupo?: any[],

        etiquetaAyuda?: string,
        saltoLinea?: boolean,
        enLinea?: boolean,
        valorPorDefecto?: any,
        habilitado?: boolean,
        // TODO: crear los modelos correspondientes
        validaciones?: Validacion[],
        accionesCondicionales?: any,
        formato?: any

    } = {}) {
        this.populate(options);

    }

    populate(options: {
        value?: any; name?: string; texto?: string; tipoElemento?: string; elementosGrupo?: any[]; etiquetaAyuda?: string; saltoLinea?: boolean; enLinea?: boolean; valorPorDefecto?: any; habilitado?: boolean;
        // TODO: crear los modelos correspondientes
        validaciones?: Validacion[]; accionesCondicionales?: any; formato?: any;
    }) {
        this.value = options.value;
        this.name = options.name || '';
        this.texto = options.texto || '';
        this.tipoElemento = options.tipoElemento || '';
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

}
