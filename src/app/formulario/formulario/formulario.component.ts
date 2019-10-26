import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { KcAreaTextoComponent } from '../elementos/kc-areatexto/kc-area-texto.component';
import { KcCampoBasicoComponent } from '../elementos/kc-campo-basico/kc-campo-basico.component';
import { ElementoFormularioModel } from 'src/app/modelos/elemento-formulario-model';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';
import { FormGroupFactoryService } from 'src/app/servicios/form-group-factory.service';
import { KcCollapsableComponent } from '../elementos/kc-collapsable/kc-collapsable.component';
import { ValidadoresService } from 'src/app/servicios/validadores.service';

@Component({
  selector: 'kc-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  // @Output() onSubmit = new EventEmitter();
  elementosFormulario: Array<any> = new Array<any>();
  form: FormGroup;
  formData = '';
  /*dataElemento: any = {
    component: AreaTextoComponent,
    inputs: {
      texto: 'area de texto dinámico'
    }
  };*/


  constructor(private formGroupfactory: FormGroupFactoryService,
              private servicioValidaciones: ValidadoresService) { }

  ngOnInit() {
    const camposJson = `{
      "elementosFormulario": [
        {
          "name": "campo1",
          "tipoElemento": "campoBasico",
          "texto": "holamundo campobasico",
          "validaciones":[
            {"tipoValidacion":"required"},
            {"tipoValidacion":"email"}
          ]
        },
        {
          "name": "area1",
          "tipoElemento": "areaTexto",
          "texto": "holamundo AreaTexto",
          "validaciones":[
            {"tipoValidacion":"email"}
          ]
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
    //const servicioValidaciones = new ValidadoresService();
    camposJson.forEach(elementoFormularioJSON => {
      let elementoFormulario: ElementoFormularioModel;
      if (elementoFormularioJSON['tipoElemento'] === 'collapsable') {
        elementoFormulario = new ElementoFormularioModel(this.servicioValidaciones);
        elementoFormulario.buildInputs(elementoFormularioJSON);
        elementoFormulario.inputs.elementosGrupo = []; // elimino estos valores porque los creare inicializados
        let elementosGrupo: any[] = elementoFormularioJSON['elementosGrupo'];
        elementosGrupo.forEach(campoCollapsabe => {
          let elementoCollapsable = new ElementoFormularioModel(this.servicioValidaciones).buildInputs(campoCollapsabe);
          elementoFormulario.inputs.elementosGrupo.push(elementoCollapsable);
        });
      } else {
        elementoFormulario = new ElementoFormularioModel(this.servicioValidaciones).buildInputs(elementoFormularioJSON);
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

