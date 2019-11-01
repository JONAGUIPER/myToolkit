import { Injectable } from '@angular/core';
import { ElementoFormularioDto } from '../modelos/elemento-formulario-dto';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ValidadoresService } from './validadores.service';

@Injectable({
  providedIn: 'root'
})
export class FormGroupFactoryService {

  constructor( private validadorService: ValidadoresService) { }

  toFormGroup(elemetosDto: ElementoFormularioDto[]) {
    let fieldControl: any = {};
    elemetosDto.forEach(elementoDto => {
      const dataElemento = elementoDto.inputs.dataElemento;
      if (dataElemento.elementosGrupo) {
        let camposAnidados = this.toFormGroupAnidado(dataElemento.elementosGrupo);
        fieldControl = { ...fieldControl, ...camposAnidados };
      } else {
        fieldControl[dataElemento.name] = dataElemento.validaciones
          ? new FormControl(dataElemento.value || '', this.validadorService.crearValidaciones(dataElemento.validaciones))
          : new FormControl(dataElemento.value || '');
      }
    });
    return new FormGroup(fieldControl);
  }
  private toFormGroupAnidado(elementosDtoAnidados: ElementoFormularioDto[]) {
    let fieldControlAnidado: any = {};
    elementosDtoAnidados.forEach(elementoDtoAnidado => {
      const dataElementoAnidado = elementoDtoAnidado.inputs.dataElemento;
      if (dataElementoAnidado.elementosGrupo) {
        let subCamposAnidados=this.toFormGroupAnidado(dataElementoAnidado.elementosGrupo);
        fieldControlAnidado = { ...fieldControlAnidado, ...subCamposAnidados };
      } else {
        fieldControlAnidado[dataElementoAnidado.name] = dataElementoAnidado.validaciones
          ? new FormControl(dataElementoAnidado.value || '', this.validadorService.crearValidaciones(dataElementoAnidado.validaciones))
          : new FormControl(dataElementoAnidado.value || '');
      }
    });
    return fieldControlAnidado;
  }
}
