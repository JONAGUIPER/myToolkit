import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AreaTextoComponent } from '../areatexto/area-texto.component';
import { CampoBasicoComponent } from '../campo-basico/campo-basico.component';
import { ElementoFormularioModel } from 'src/app/modelos/elemento-formulario-model';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';
import { FormGroupFactoryService } from 'src/app/servicios/form-group-factory.service';
import { CollapsableComponent } from '../collapsable/collapsable.component';

@Component({
  selector: 'kc-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  //@Output() onSubmit = new EventEmitter();
  elementosFormulario: Array<any> = new Array<any>();
  form: FormGroup;
  formData = '';
  /*dataElemento: any = {
    component: AreaTextoComponent,
    inputs: {
      texto: 'area de texto dinámico'
    }
  };*/


  constructor(private formGroupfactory: FormGroupFactoryService) { }

  ngOnInit() {
    const camposJson = `{
      "elementosFormulario": [
        {
          "name": "campo1",
          "tipoElemento": "campoBasico",
          "texto": "holamundo campobasico",
          "obligatorio":true
        },
        {
          "name": "area1",
          "tipoElemento": "areaTexto",
          "texto": "holamundo AreaTexto"
        },
        {
          "name": "mi form collapsable",
          "tipoElemento": "collapsable",
          "texto": "holamundo collapsable",
          "elementosGrupo": [
            {
              "name": "campo1Colapsable",
              "tipoElemento": "campoBasico",
              "texto": "holamundo campoBasico collapsable"
            },
            {
              "name": "area1Collapsable",
              "tipoElemento": "areaTexto",
              "texto": "holamundo AreaTexto collapsable"
            }
          ]
        }
      ]
    }`;
    const modeloRender = JSON.parse(camposJson);
    console.log(modeloRender);
    modeloRender.elementosFormulario.forEach((element: any) => {
      console.log(element);
    });
    this.render(modeloRender.elementosFormulario);

  }

  render(camposJson: [] = []) {
    camposJson.forEach(elementoFormularioJSON => {
      let elementoFormulario: ElementoFormularioModel;
      if (elementoFormularioJSON['tipoElemento'] === "collapsable") {
        elementoFormulario = new ElementoFormularioModel();
        elementoFormulario.buildInputs(elementoFormularioJSON);
        elementoFormulario.inputs.elementosGrupo = [];//elimino estos valores porque los creare inicializados
        let elementosGrupo: any[] = elementoFormularioJSON["elementosGrupo"];
        elementosGrupo.forEach(campoCollapsabe => {
          let elementoCollapsable = new ElementoFormularioModel().buildInputs(campoCollapsabe);
          elementoFormulario.inputs.elementosGrupo.push(elementoCollapsable);
        });
      } else {
        elementoFormulario = new ElementoFormularioModel().buildInputs(elementoFormularioJSON);
      }
      this.elementosFormulario.push(elementoFormulario);
    });
    this.form = this.formGroupfactory.toFormGroup(this.elementosFormulario);
    this.formData = JSON.stringify(this.form.value);

  }

  onChange(e) {
    console.log(e);
    console.log(JSON.stringify(this.form.value));
  }

  onSubmit() {
    this.formData = JSON.stringify(this.form.value);
  }
}

