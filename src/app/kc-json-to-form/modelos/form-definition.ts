import { ElementoFormularioDto } from './elemento-formulario-dto';

export interface FormDefinition {
    name: string;
    elementosFormulario: Array<ElementoFormularioDto>;
}
