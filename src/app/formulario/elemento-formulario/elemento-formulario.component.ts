import { Component, OnInit, Injector } from '@angular/core';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kc-elemento-formulario',
  templateUrl: './elemento-formulario.component.html',
  styleUrls: ['./elemento-formulario.component.css']
})
export class ElementoFormularioComponent extends DataElementoFormularioModel<string> implements OnInit {

  form: FormGroup;
  elementosFormulario: Array<ElementoFormularioComponent> = new Array<ElementoFormularioComponent>();


  constructor() {
    super();
  }

  ngOnInit() {

  }
  get isValid() { return this.form.controls[this.name].valid; }
  get isDirty() { return this.form.controls[this.name].dirty; }

  setInputs(injector: Injector) {
    this.texto = injector.get<string>('texto' as any);
    this.name = injector.get<string>('name' as any);
    this.value = injector.get<any>('value' as any);
    this.form = injector.get<FormGroup>('formulario' as any);
  }
}
