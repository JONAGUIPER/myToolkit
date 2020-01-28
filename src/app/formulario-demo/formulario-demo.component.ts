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
    jsonText: [`{"elementosFormulario": [
      {
        "name": "campo1",
        "tipoElemento": "campoBasico",
        "texto": "holamundo campobasico",
        "validaciones":[
          {"tipoValidacion":"required"},
          {"tipoValidacion":"email"}
        ]
      }
    ]}`, Validators.required],
  });
  formDefinitionARenderizar: FormDefinition;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  onSubmit() {
    console.log('enviando el JSON ' + this.formDemo.get('jsonText').value);
    const jsonForm = this.formDemo.get('jsonText').value;
    if (jsonForm) {
      this.formDefinitionARenderizar = JSON.parse(jsonForm);
    }
  }
}

// CONFIGURACION PARA COMBO
/*
{"elementosFormulario": [
  {
    "name": "campo1",
    "tipoElemento": "combo",
    "texto": "holamundo campobasico",
    "cargarValores": {
      "service": {
        "servicio": {
          "operation": "beers",
          "url": "https://api.punkapi.com/v2/"
        },
        "parametros": [
          { "nombreParametro": "brewed_before", "valorFijo": "11-2012" },
          { "nombreParametro": "abv_gt", "valorFijo": "20" }
        ],
        "respuesta": {
          "value": "id",
          "caption": "name"
        }
      }
    }
  }
]}
    */
