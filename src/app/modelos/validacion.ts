export class Validacion {
    tipoValidacion: string;
    parametros: any[];

    constructor(options: {
        tipoValidacion?: string,
        parametros?: any[]
    } = {}) {
        this.tipoValidacion = options.tipoValidacion || '';
        this.parametros = options.parametros || [];
    }
}
