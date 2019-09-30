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
          "elementoTipo": "campoBasico",
          "texto": "holamundo campobasico"
        },
        {
          "name": "area1",
          "elementoTipo": "areaTexto",
          "texto": "holamundo AreaTexto"
        },
        {
          "name": "mi form collapsable",
          "elementoTipo": "collapsable",
          "texto": "holamundo collapsable",
          "value": [
            {
              "name": "campo1Colapsable",
              "elementoTipo": "campoBasico",
              "texto": "holamundo campoBasico collapsable"
            },
            {
              "name": "area1Collapsable",
              "elementoTipo": "areaTexto",
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
    camposJson.forEach(elemento => {
      const tipoElemento: any = this.getObjectComponent(elemento['elementoTipo']);
      let elementoFormulario: ElementoFormularioModel<any>;
      let dataElementoFormulario: DataElementoFormularioModel<any>;
      if (elemento['elementoTipo'] === "collapsable") {
        let camposCollapsable: any[] = elemento["value"];
        dataElementoFormulario = new DataElementoFormularioModel<DataElementoFormularioModel<string>[]>(
          {
            texto: elemento['texto'],
            name: elemento['name'],
            value: [],
            tipoElemento: elemento['elementoTipo'],
          }
        );

        camposCollapsable.forEach(campoCollapsabe => {
          let tipoElementoCollapsable: any = this.getObjectComponent(campoCollapsabe['elementoTipo']);
          let dataElementoCollapsable = new DataElementoFormularioModel<string>(
            {
              texto: campoCollapsabe['texto'],
              name: campoCollapsabe['name'],
              tipoElemento: campoCollapsabe['elementoTipo'],
            }
          );
          let elementoCollapsable = new ElementoFormularioModel<string>();
          elementoCollapsable
            .buildWithComponent(tipoElementoCollapsable)
            .buildWithInputs(dataElementoCollapsable);
          dataElementoFormulario.value.push(elementoCollapsable);
        });
        elementoFormulario = new ElementoFormularioModel<DataElementoFormularioModel<string>[]>();
        elementoFormulario
          .buildWithComponent(elementoFormulario)
          .buildWithInputs(dataElementoFormulario);
      } else {
        elementoFormulario = new ElementoFormularioModel<string>();
        dataElementoFormulario = new DataElementoFormularioModel<string>(
          {
            texto: elemento['texto'],
            name: elemento['name'],
            tipoElemento: elemento['elementoTipo'],
            obligatorio: true
          });
      }
      elementoFormulario
        .buildWithComponent(tipoElemento)
        .buildWithInputs(dataElementoFormulario);
      this.elementosFormulario.push(elementoFormulario);

    });
    this.form = this.formGroupfactory.toFormGroup(this.elementosFormulario);
    this.formData = JSON.stringify(this.form.value);

  }

  getObjectComponent(componentName: string): any {
    switch (componentName) {
      case 'campoBasico':
        return CampoBasicoComponent;
      case 'areaTexto':
        return AreaTextoComponent;
      case 'collapsable':
        return CollapsableComponent;
      default:
        break;
    }
  }
  onChange(e) {
    console.log(JSON.stringify(this.form.value));
  }

  onSubmit() {
    this.formData = JSON.stringify(this.form.value);
  }
}

