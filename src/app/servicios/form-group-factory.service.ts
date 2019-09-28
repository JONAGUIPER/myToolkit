import { Injectable } from '@angular/core';
import { ElementoFormularioModel } from '../modelos/elemento-formulario-model';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormGroupFactoryService {

  constructor() { }

  toFormGroup(campos: ElementoFormularioModel<any>[]) {
    let fieldControl: any = {};
    campos.forEach(campo => {
      fieldControl[campo.inputs.name] = campo.inputs.obligatorio
        ? new FormControl(campo.inputs.value || '', Validators.required)
        : new FormControl(campo.inputs.value || '');
    });
    return new FormGroup(fieldControl);
  }
}
