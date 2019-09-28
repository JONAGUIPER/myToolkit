import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AreaTextoComponent } from '../areatexto/area-texto.component';
import { CampoBasicoComponent } from '../campo-basico/campo-basico.component';
import { ElementoFormularioModel } from 'src/app/modelos/elemento-formulario-model';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';
import { FormGroupFactoryService } from 'src/app/servicios/form-group-factory.service';

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
    let camposJson = `{
      "elementosFormulario": [
        {
          "name":"campo1",
          "elementoTipo": "campoBasico",
          "texto": "holamundo campobasico"
        },
        {
          "name":"area1",
          "elementoTipo": "areaTexto",
          "texto": "holamundo AreaTexto"
        }
      ]
    }`;
    let modeloRender = JSON.parse(camposJson);
    console.log(modeloRender);
    modeloRender.elementosFormulario.forEach((element: any) => {
      console.log(element);
    });
    this.render(modeloRender.elementosFormulario);

  }

  render(camposJson: [] = []) {
    // const elementos: ElementoFormularioComponent = new ElementoFormularioComponent();
    // this.elementosFormulario = elementos.render();
    camposJson.forEach(elemento => {
      let tipoElemento: any = this.getObjectComponent(elemento['elementoTipo']);
      let elementoComponente: ElementoFormularioModel<string> = new ElementoFormularioModel<string>();
      let dataElementoComponente: DataElementoFormularioModel<string> = new DataElementoFormularioModel<string>({ texto: elemento['texto'], name: elemento['name'] });

      elementoComponente
        .buildWithComponent(tipoElemento)
        .buildWithInputs(dataElementoComponente);
      this.elementosFormulario.push(elementoComponente);

    });
    this.form = this.formGroupfactory.toFormGroup(this.elementosFormulario);
    this.formData = JSON.stringify(this.form.value);
    /*const area1: any = {
      component: AreaTextoComponent,
      inputs: {
        texto: 'area 1 de texto dinámico'
      }
    };
    const campo1: ElementoFormularioModel<string> = new ElementoFormularioModel<string>();
    campo1.buildWithComponent(CampoBasicoComponent)
      .buildWithInputs(
        new DataElementoFormularioModel<string>()
          .buildWithTexto('campobasico 1 desde formulario')
          .buildWithName('campo1')
      );
    this.elementosFormulario.push(area1);
    this.elementosFormulario.push(campo1);*/
  }

  getObjectComponent(componentName: string): any {
    switch (componentName) {
      case 'campoBasico':
        return CampoBasicoComponent;
      case 'areaTexto':
        return AreaTextoComponent;
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

