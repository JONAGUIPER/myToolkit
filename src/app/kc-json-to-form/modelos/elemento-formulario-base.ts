import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Validacion } from './validacion';
import { ElementoFormularioDto } from './elemento-formulario-dto';
import { AbstractElementoFormulario } from './abstract-elemento-formulario';
import { ValidationErrors, FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';


export interface IElementoFormularioBase {
    value?: any;
    name?: string;
    texto?: string;
    tipoElemento?: string;
    valorPorDefecto?: any;
    elementosGrupo?: ElementoFormularioDto[];
    /*
    etiquetaAyuda?: string,
    saltoLinea?: boolean,
    enLinea?: boolean,
    habilitado?: boolean,
    */
    // TODO: crear los modelos correspondientes
    validaciones?: Validacion[];
    accionesCondicionales?: any;
    formato?: any;
}
export class ElementoFormularioBase extends AbstractElementoFormulario implements IElementoFormularioBase {
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

    form: FormGroup;
    elementosFormulario: Array<ElementoFormularioBase> = new Array<ElementoFormularioBase>();

    constructor(options: IElementoFormularioBase = {}) {
        super();
        this.populate(options);
    }
    populate<ElementoFormularioBase>(options) {
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

        ///return this;
    }

    get isValid() { return this.form.controls[this.name].valid; }
    get isDirty() { return this.form.controls[this.name].dirty; }
    get errores() {
        const errores: ValidationErrors = this.form.controls[this.name].errors;
        let erroresString = '';
        Object.keys(errores).forEach(keyError => {
            erroresString += /*' keyError: ' + keyError + ', err value: ' + */errores[keyError].mensaje + '\n';
        });
        return erroresString;
    }

    setInputs<T>(injector: Injector) {
        this.form = injector.get<FormGroup>('formulario' as any);
        const dataElemento = injector.get<T>('dataElemento' as any);
        this.populate(dataElemento);
    }
}
