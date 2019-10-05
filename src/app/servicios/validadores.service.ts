import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, RequiredValidator, Validators } from '@angular/forms';
import { Validacion } from '../modelos/validacion';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  crearValidaciones(listaValidaciones: Validacion[] = []): ValidatorFn[] {
    let validacionesResultado: ValidatorFn[] = [];
    for (const validacion of listaValidaciones) {
      switch (validacion.tipoValidacion) {
        case 'required':
          validacionesResultado.push(Validators.required);
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
}
