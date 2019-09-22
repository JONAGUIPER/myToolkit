import { DataElementoFormularioModel } from './data-elemento-formulario-model';

export class ElementoFormularioModel {

    constructor() {
        return this.inner;
    }

    inner: ElementoFormularioModel;
    component: any;
    inputs: DataElementoFormularioModel;

    buildWithComponent(component: any): ElementoFormularioModel {
        this.inner.component = component;
        return this.inner;
    }

    buildWithInputs(inputs: DataElementoFormularioModel): ElementoFormularioModel {
        this.inner.inputs = inputs;
        return this.inner;
    }
}
