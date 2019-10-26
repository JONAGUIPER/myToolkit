import { Condicion } from './condicion';

export interface Condiciones {
    condiciones?: Condicion[];
    subCondiciones?: Condiciones[];
    operadorLogico: string;
}
