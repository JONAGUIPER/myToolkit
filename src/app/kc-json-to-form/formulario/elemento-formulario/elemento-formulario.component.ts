import { Component, OnInit, Injector } from '@angular/core';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'kc-elemento-formulario',
  templateUrl: './elemento-formulario.component.html',
  styleUrls: ['./elemento-formulario.component.css']
})
export class ElementoFormularioComponent extends ElementoFormularioBase implements OnInit {

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
    this.form = injector.get<FormGroup>('formulario' as any);
    const dataElemento = injector.get<ElementoFormularioBase>('dataElemento' as any);
    this.populate(dataElemento);
  }

}
