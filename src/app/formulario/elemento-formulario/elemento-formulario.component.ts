import { Component, OnInit, Injector } from '@angular/core';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'kc-elemento-formulario',
  templateUrl: './elemento-formulario.component.html',
  styleUrls: ['./elemento-formulario.component.css']
})
export class ElementoFormularioComponent extends DataElementoFormularioModel implements OnInit {

  form: FormGroup;
  elementosFormulario: Array<ElementoFormularioComponent> = new Array<ElementoFormularioComponent>();


  constructor() {
    super();
  }

  ngOnInit() {

  }
  get isValid() { return this.form.controls[this.name].valid; }
  get isDirty() { return this.form.controls[this.name].dirty; }
  get errores() {
    const errores: ValidationErrors = this.form.controls[this.name].errors;
    let erroresString = '';
    Object.keys(errores).forEach(keyError => {
      erroresString += /*' keyError: ' + keyError + ', err value: ' + */errores[keyError].mensaje + '\n';
    });
    return erroresString;
  }

  setInputs(injector: Injector) {
    this.texto = injector.get<string>('texto' as any);
    this.form = injector.get<FormGroup>('formulario' as any);
    this.name = injector.get<string>('name' as any);
    this.value = injector.get<any>('value' as any);
    this.elementosGrupo = injector.get<any[]>('elementosGrupo' as any);
  }

}
