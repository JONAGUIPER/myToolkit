import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, RequiredValidator, Validators } from '@angular/forms';
import { Validacion } from '../modelos/validacion';
import { Condiciones } from '../modelos/condiciones';
import { CondicionalesService } from './condicionales.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {


  constructor(private condiconesService: CondicionalesService) { }

  crearListaValidacionesFromJson(listaJson: any): Validacion[] {
    const listaValidaciones: Validacion[] = [];
    listaJson.validaciones.forEach(element => {
      listaValidaciones.push(element);
    });
    return listaValidaciones;
  }

  crearValidaciones(listaValidaciones: Validacion[] = []): ValidatorFn[] {
    const validacionesResultado: ValidatorFn[] = [];
    if (!!listaValidaciones) {
      for (const validacion of listaValidaciones) {
        switch (validacion.tipoValidacion) {
          case 'required':
            validacionesResultado.push(this.kcRequiredValidator(validacion.condiciones));
            break;
          case 'email':
            validacionesResultado.push(this.kcEmailValidator(validacion.condiciones));
            break;
          default:
            break;
        }
      }
    }
    return validacionesResultado;
  }

  kcRequiredValidator(condiciones: Condiciones): ValidatorFn {
    const funcionValidacion = (control: AbstractControl): { [key: string]: any } | null => {
      if (this.condiconesService.evaluar(control.parent, condiciones)) {
        const inValido = Validators.required(control);
        return inValido ? { kcRequiredValidator: { value: control.value, mensaje: 'Campo obligatorio' } } : null;
      } else {
        return null;
      }

    };
    return funcionValidacion;
  }
  kcEmailValidator(condiciones: Condiciones): ValidatorFn {
    const funcionValidacion = (control: AbstractControl): { [key: string]: any } | null => {
      if (this.condiconesService.evaluar(control.parent, condiciones)) {
        const inValido = Validators.email(control);
        return inValido ? { kcEmailValidator: { value: control.value, mensaje: 'formato de email no válido' } } : null;
      } else {
        return null;
      }

    };
    return funcionValidacion;
  }

}
