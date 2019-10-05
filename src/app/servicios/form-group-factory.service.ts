import { Injectable } from '@angular/core';
import { ElementoFormularioModel } from '../modelos/elemento-formulario-model';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormGroupFactoryService {

  constructor() { }

  toFormGroup(campos: ElementoFormularioModel[]) {
    let fieldControl: any = {};
    campos.forEach(campo => {
      if (campo.inputs.tipoElemento === 'collapsable') {
        let camposAnidados = this.toFormGroupAnidado(campo.inputs.elementosGrupo);
        fieldControl = { ...fieldControl, ...camposAnidados };
      } else {
        fieldControl[campo.inputs.name] = campo.inputs.obligatorio
          ? new FormControl(campo.inputs.value || '', Validators.required)
          : new FormControl(campo.inputs.value || '');
      }

    });
    return new FormGroup(fieldControl);
  }
  private toFormGroupAnidado(camposAnidados: ElementoFormularioModel[]) {
    let fieldControlAnidado: any = {};
    camposAnidados.forEach(campoAnidado => {
      if (campoAnidado.inputs.tipoElemento === 'collapsabe') {
        let subCamposAnidados=this.toFormGroupAnidado(campoAnidado.inputs.elementosGrupo);
        fieldControlAnidado = { ...fieldControlAnidado, ...subCamposAnidados };
      } else {
        fieldControlAnidado[campoAnidado.inputs.name] = campoAnidado.inputs.obligatorio
          ? new FormControl(campoAnidado.inputs.value || '', Validators.required)
          : new FormControl(campoAnidado.inputs.value || '');
      }
    });
    return fieldControlAnidado;
  }
}
