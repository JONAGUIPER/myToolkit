import { Condicion } from './condicion';
import { get } from 'http';

export interface Condiciones {
    condiciones?: Condicion[];
    subCondiciones?: Condiciones[];
    operadorLogico: string;
}
