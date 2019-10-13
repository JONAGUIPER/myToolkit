import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, RequiredValidator, Validators } from '@angular/forms';
import { Validacion } from '../modelos/validacion';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  crearListaValidacionesFromJson(listaJson: any): Validacion[] {
    let listaValidaciones: Validacion[] = [];
    return listaValidaciones;
  }

  crearValidaciones(listaValidaciones: Validacion[] = []): ValidatorFn[] {
    let validacionesResultado: ValidatorFn[] = [];
    for (const validacion of listaValidaciones) {
      switch (validacion.tipoValidacion) {
        case 'required':
          validacionesResultado.push(this.kcRequiredValidator);
          break;
        case 'email':
          validacionesResultado.push(Validators.email);
          break;
        default:
          break;
      }
    }
    return validacionesResultado;
  }

  kcRequiredValidator(): ValidatorFn {
    const funcionValidacion = (control: AbstractControl): { [key: string]: any } | null => {
      const obligatorio = Validators.required(control);
      return obligatorio ? { 'kcRequiredValidator': { value: control.value, mensaje: 'error de mi campo requerido' } } : null;
    };
    return funcionValidacion;
  }
}
