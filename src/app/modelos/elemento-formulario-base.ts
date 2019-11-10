import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Validacion } from './validacion';
import { ElementoFormularioDto } from './elemento-formulario-dto';

export class ElementoFormularioBase {
    value: any;
    name: string;
    texto: string;
    tipoElemento: string;
    valorPorDefecto: any;
    elementosGrupo: ElementoFormularioDto[];
    /*
    etiquetaAyuda: string;
    saltoLinea: boolean;
    enLinea: boolean;
    habilitado: boolean;
    */
    validaciones: Validacion[];
    accionesCondicionales: any;
    formato: any;

    constructor(options: {
        value?: any,
        name?: string,
        texto?: string,
        tipoElemento?: string,
        valorPorDefecto?: any,
        elementosGrupo?: ElementoFormularioDto[],
        /*
        etiquetaAyuda?: string,
        saltoLinea?: boolean,
        enLinea?: boolean,
        habilitado?: boolean,
        */
        // TODO: crear los modelos correspondientes
        validaciones?: Validacion[],
        accionesCondicionales?: any,
        formato?: any

    } = {}) {
        this.populate(options);

    }

    populate(options: {
        value?: any;
        name?: string;
        texto?: string;
        tipoElemento?: string;
        /*
        etiquetaAyuda?: string;
        saltoLinea?: boolean;
        enLinea?: boolean;
        habilitado?: boolean;
        */
        valorPorDefecto?: any;
        elementosGrupo?: ElementoFormularioDto[];
        // TODO: crear los modelos correspondientes
        validaciones?: Validacion[]; accionesCondicionales?: any; formato?: any;
    }) {
        this.value = options.value;
        this.name = options.name || '';
        this.texto = options.texto || '';
        this.tipoElemento = options.tipoElemento || '';
        /*
        this.etiquetaAyuda = options.etiquetaAyuda || '';
        this.saltoLinea = options.saltoLinea || false;
        this.enLinea = options.enLinea || true;
        this.valorPorDefecto = options.valorPorDefecto || null;
        this.habilitado = options.habilitado || true;
        this.formato = options.formato || '';
       */
        this.valorPorDefecto = options.valorPorDefecto || null;

        this.elementosGrupo = options.elementosGrupo;
        // TODO: crear los modelos correspondientes
        this.validaciones = options.validaciones || null;
        this.accionesCondicionales = options.accionesCondicionales || null;
    }

}
