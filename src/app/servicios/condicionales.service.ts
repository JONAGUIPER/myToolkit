import { Injectable } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Condicion } from '../modelos/condicion';
import { CondicionesEnum } from '../enumeradores/condiciones-enum.enum';
import { Condiciones } from '../modelos/condiciones';
import { OperadoresLogicosEnum } from '../enumeradores/operadores-logicos-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class CondicionalesService {
  formulario: FormGroup;
  constructor() {

  }

  evaluarCondicionSimple(fieldEvaluado: AbstractControl, condicion: Condicion): boolean {
    let valorEvaluador = condicion.valorFijo;
    const valorEvaluado = fieldEvaluado.value;
    if (condicion.nombreCampo) {
      valorEvaluador = this.formulario.get(condicion.nombreCampo).value;
    }
    switch (condicion.condicion) {
      case CondicionesEnum.IGUAL:
        // tslint:disable-next-line: triple-equals
        return valorEvaluado == valorEvaluador;
      case CondicionesEnum.DISTINTO:
        // tslint:disable-next-line: triple-equals
        return valorEvaluado != valorEvaluador;
      case CondicionesEnum.MAYOR:
        return Number(valorEvaluado) > Number(valorEvaluador);
      case CondicionesEnum.MENOR:
        return Number(valorEvaluado) < Number(valorEvaluador);
      case CondicionesEnum.MAYORIGUAL:
        return Number(valorEvaluado) >= Number(valorEvaluador);
      case CondicionesEnum.MENORIGUAL:
        return Number(valorEvaluado) <= Number(valorEvaluador);
      default:
        throw new Error('OPERADOR CONDICIONAL INVALIDO');
    }
  }

  evaluar(fieldEvaluado: AbstractControl, condiciones: Condiciones): boolean {
    let respuesta: boolean;
    if (!condiciones) {
      return true;
    } else if (condiciones.subCondiciones) {
      respuesta = this.evaluarSubCondiciones(fieldEvaluado, condiciones);
    } else if (condiciones.condiciones) {
      respuesta = this.evaluarCondicion(fieldEvaluado, condiciones);
    } else {
      return true;
    }
    return respuesta;
  }

  private evaluarSubCondiciones(fieldEvaluado: AbstractControl, condiciones: Condiciones) {
    let respuesta: boolean;
    condiciones.subCondiciones.forEach((itemCondiciones, index) => {
      if (index === 0) {
        respuesta = this.establecerCondicionInicialPorDefecto(condiciones.operadorLogico);
      }
      respuesta = this.ejecutarOperadorLogico(condiciones.operadorLogico, respuesta, this.evaluarCondicion(fieldEvaluado, itemCondiciones));
    });
    return respuesta;
  }

  private evaluarCondicion(fieldEvaluado: AbstractControl, condiciones: Condiciones) {
    let respuesta: boolean;
    condiciones.condiciones.forEach((condicion, index) => {
      if (index === 0) {
        respuesta = this.establecerCondicionInicialPorDefecto(condiciones.operadorLogico);
      }
      respuesta = this.ejecutarOperadorLogico(condiciones.operadorLogico, respuesta, this.evaluarCondicionSimple(fieldEvaluado, condicion));
    });
    return respuesta;
  }

  private ejecutarOperadorLogico(operadorLogico: string, valorIzquierda: boolean, valorDerecha: boolean): boolean {
    let respuesta: boolean;
    switch (operadorLogico) {
      case OperadoresLogicosEnum.AND:
        respuesta = valorIzquierda && valorDerecha;
        break;
      case OperadoresLogicosEnum.OR:
        respuesta = valorIzquierda || valorDerecha;
        break;
      default:
        throw new Error('OPERADOR LOGICO INVALIDO');
    }
    return respuesta;
  }

  private establecerCondicionInicialPorDefecto(operadorLogico: string) {
    let respuesta: boolean;
    switch (operadorLogico) {
      case OperadoresLogicosEnum.AND:
        respuesta = true;
        break;
      case OperadoresLogicosEnum.OR:
        respuesta = false;
        break;
      default:
        throw new Error('OPERADOR LOGICO INVALIDO');
    }
    return respuesta;
  }
}
