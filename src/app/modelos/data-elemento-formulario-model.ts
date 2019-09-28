import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export class DataElementoFormularioModel<T> {
    value: T;
    name: string;
    texto: string;
    tipoElemento: string;
    obligatorio: boolean;


    constructor(options: {
        value?: T,
        name?: string,
        texto?: string,
        tipoElemento?: string,
        obligatorio?: boolean,
    } = {}) {
        this.value = options.value;
        this.name = options.name || '';
        this.texto = options.texto || '';
        this.tipoElemento = options.tipoElemento || '';
        this.obligatorio = !!options.obligatorio;
    }



    buildWithTexto(texto: string): DataElementoFormularioModel<T> {
        this.texto = texto;
        return this;
    }

    buildWithValue(value: T): DataElementoFormularioModel<T> {
        this.value = value;
        return this;
    }

    buildWithName(name: string): DataElementoFormularioModel<T> {
        this.name = name;
        return this;
    }



}
