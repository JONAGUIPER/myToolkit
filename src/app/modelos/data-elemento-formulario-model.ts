import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export class DataElementoFormularioModel {
    constructor() {
        return this.inner;
    }

    inner: DataElementoFormularioModel;
    id: string;
    texto: string;
    value: string;
    tipoElemento: string;

    buildWithTexto(texto: string): DataElementoFormularioModel {
        this.inner.texto = texto;
        return this.inner;
    }

    buildWithValue(value: string): DataElementoFormularioModel {
        this.inner.value = value;
        return this.inner;
    }

    buildWithId(id: string): DataElementoFormularioModel {
        this.inner.id = id;
        return this.inner;
    }



}
