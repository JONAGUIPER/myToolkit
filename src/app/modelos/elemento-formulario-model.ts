import { DataElementoFormularioModel } from './data-elemento-formulario-model';
//TODO: se puede cambiar para que T sea el tipo de fields (campobasico,AreaTexto, etc) en funcion a esto se cambie el tipo de value a string, array, etc
export class ElementoFormularioModel<T> {

    constructor() {
        //return this.inner;
    }

    //inner: ElementoFormularioModel;
    component: any;
    inputs: DataElementoFormularioModel<T>;

    buildWithComponent(component: any): ElementoFormularioModel<T> {
        this.component = component;
        return this;
    }

    buildWithInputs(inputs: DataElementoFormularioModel<T>): ElementoFormularioModel<T> {
        this.inputs = inputs;
        return this;
    }
}
