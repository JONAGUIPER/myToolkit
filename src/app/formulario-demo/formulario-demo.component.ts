import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormDefinition } from '../kc-json-to-form/modelos/form-definition';

@Component({
  selector: 'kc-formulario-demo',
  templateUrl: './formulario-demo.component.html',
  styleUrls: ['./formulario-demo.component.css']
})
export class FormularioDemoComponent implements OnInit {

  formDemo = this.fb.group({
    jsonText: ['', Validators.required],
  });
  formDefinitionARenderizar: FormDefinition;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  onSubmit() {
    console.log('enviando el JSON ' + this.formDemo.get('jsonText').value);
    const jsonForm = this.formDemo.get('jsonText').value;
    if (jsonForm){
      this.formDefinitionARenderizar = JSON.parse(jsonForm);
    }
  }
}
