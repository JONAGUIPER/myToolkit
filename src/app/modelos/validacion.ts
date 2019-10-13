export class Validacion {
    tipoValidacion: string;
    parametros: any[];
    condiciones: any[];

    constructor(options: {
        tipoValidacion?: string,
        parametros?: any[],
        condiciones?: any[]//TODO crear  objeto condiciones
    } = {}) {
        this.tipoValidacion = options.tipoValidacion || '';
        this.parametros = options.parametros || [];
        this.condiciones = options.condiciones || [];
    }
}
