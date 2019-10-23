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
    listaJson.validaciones.forEach(element => {
      listaValidaciones.push(element);
    });
    return listaValidaciones;
  }

  crearValidaciones(listaValidaciones: Validacion[] = []): ValidatorFn[] {
    let validacionesResultado: ValidatorFn[] = [];
    if (!!listaValidaciones) {
      for (const validacion of listaValidaciones) {
        switch (validacion.tipoValidacion) {
          case 'required':
            validacionesResultado.push(this.kcRequiredValidator());
            break;
          case 'email':
            validacionesResultado.push(this.kcEmailValidator());
            break;
          default:
            break;
        }
      }
    }
    return validacionesResultado;
  }

  kcRequiredValidator(): ValidatorFn {
    const funcionValidacion = (control: AbstractControl): { [key: string]: any } | null => {
      const inValido = Validators.required(control);
      return inValido ? { 'kcRequiredValidator': { value: control.value, mensaje: 'Campo obligatorio' } } : null;
    };
    return funcionValidacion;
  }
  kcEmailValidator(): ValidatorFn {
    const funcionValidacion = (control: AbstractControl): { [key: string]: any } | null => {
      const inValido = Validators.email(control);
      return inValido ? { 'kcEmailValidator': { value: control.value, mensaje: 'formato de email no válido' } } : null;
    };
    return funcionValidacion;
  }

}
