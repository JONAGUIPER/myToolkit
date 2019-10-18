import { Injectable } from '@angular/core';
import { ElementoFormularioModel } from '../modelos/elemento-formulario-model';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ValidadoresService } from './validadores.service';

@Injectable({
  providedIn: 'root'
})
export class FormGroupFactoryService {

  constructor( private validadorService: ValidadoresService) { }

  toFormGroup(campos: ElementoFormularioModel[]) {
    let fieldControl: any = {};
    campos.forEach(campo => {
      if (campo.inputs.tipoElemento === 'collapsable') {
        let camposAnidados = this.toFormGroupAnidado(campo.inputs.elementosGrupo);
        fieldControl = { ...fieldControl, ...camposAnidados };
      } else {
        fieldControl[campo.inputs.name] = campo.inputs.validaciones
          ? new FormControl(campo.inputs.value || '', this.validadorService.crearValidaciones(campo.inputs.validaciones))
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
        fieldControlAnidado[campoAnidado.inputs.name] = campoAnidado.inputs.validaciones
          ? new FormControl(campoAnidado.inputs.value || '', this.validadorService.crearValidaciones(campoAnidado.inputs.validaciones))
          : new FormControl(campoAnidado.inputs.value || '');
      }
    });
    return fieldControlAnidado;
  }
}
