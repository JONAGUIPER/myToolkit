import { DataElementoFormularioModel } from './data-elemento-formulario-model';
import { CampoBasicoComponent } from '../formulario/campo-basico/campo-basico.component';
import { AreaTextoComponent } from '../formulario/areatexto/area-texto.component';
import { CollapsableComponent } from '../formulario/collapsable/collapsable.component';
// TODO: se puede cambiar para que T sea el tipo de fields
// (campobasico,AreaTexto, etc) en funcion a esto se cambie el tipo de value
// a string, array, etc
export class ElementoFormularioModel {

    constructor() {
        // return this.inner;
    }

    // inner: ElementoFormularioModel;
    component: any;
    inputs: DataElementoFormularioModel;

    buildWithComponentName(componentName: string): ElementoFormularioModel {
        this.component = this.getObjectComponent(componentName);
        return this;
    }

    buildWithInputs(inputs: DataElementoFormularioModel): ElementoFormularioModel {
        this.inputs = inputs;
        return this;
    }
    buildInputs(datosInput: any) {
        this.component = this.getObjectComponent(datosInput.tipoElemento);
        this.inputs = new DataElementoFormularioModel(datosInput);
        return this;
    }
    build(options: {
        tipoElemento?: string,
        name?: string,

        
        texto?: string,
        value?: any,
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
        //obligatorios
        this.component = this.getObjectComponent(options.tipoElemento);
        this.inputs.name = options.name || '';

        this.inputs.value = options.value;
        this.inputs.texto = options.texto || '';
        
        this.inputs.obligatorio = !!options.obligatorio;
        this.inputs.elementosGrupo = options.elementosGrupo;

        this.inputs.etiquetaAyuda = options.etiquetaAyuda || '';
        this.inputs.saltoLinea = options.saltoLinea || false;
        this.inputs.enLinea = options.enLinea || true;
        this.inputs.valorPorDefecto = options.valorPorDefecto || null;
        this.inputs.habilitado = options.habilitado || true;
        // TODO: crear los modelos correspondientes
        this.inputs.validaciones = options.validaciones || null;
        this.inputs.accionesCondicionales = options.accionesCondicionales || null;
        this.inputs.formato = options.formato || '';

    };

    private getObjectComponent(componentName: string): any {
        switch (componentName) {
            case 'campoBasico':
                return CampoBasicoComponent;
            case 'areaTexto':
                return AreaTextoComponent;
            case 'collapsable':
                return CollapsableComponent;
            default:
                break;
        }
    }

}
