import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { KcAreaTextoComponent } from '../elementos/kc-areatexto/kc-area-texto.component';
import { KcCampoBasicoComponent } from '../elementos/kc-campo-basico/kc-campo-basico.component';
import { ElementoFormularioDto } from 'src/app/modelos/elemento-formulario-dto';
import { ElementoFormularioBase } from 'src/app/modelos/elemento-formulario-base';
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
  elementosFormulario: Array<ElementoFormularioDto> = new Array<ElementoFormularioDto>();
  form: FormGroup;
  formData = '';
  /*dataElemento: any = {
    component: AreaTextoComponent,
    inputs: {
      texto: 'area de texto dinámico'
    }
  };*/


  constructor(private formGroupfactory: FormGroupFactoryService,
    ) { }

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

  render(camposJson: any[] = []) {
    camposJson.forEach(elementoFormularioJSON => {
      let elementoFormulario: ElementoFormularioDto;
      if (elementoFormularioJSON['elementosGrupo']) {
        elementoFormulario = new ElementoFormularioDto(elementoFormularioJSON);
        elementoFormulario.inputs.dataElemento.elementosGrupo = this.crearElementosGrupo(elementoFormularioJSON['elementosGrupo']);
      } else {
        elementoFormulario = new ElementoFormularioDto(elementoFormularioJSON);
      }
      this.elementosFormulario.push(elementoFormulario);
    });
    this.form = this.formGroupfactory.toFormGroup(this.elementosFormulario);
    this.formData = JSON.stringify(this.form.value);

  }

  private crearElementosGrupo(elementosGrupo: any[], ) {
    const elementosDtoGrupo: ElementoFormularioDto[] = [];
    elementosGrupo.forEach(elementoGrupo => {
      elementosDtoGrupo.push(new ElementoFormularioDto(elementoGrupo));
    });
    return elementosDtoGrupo;
  }

  onChange(e) {
    console.log(e);
    console.log(JSON.stringify(this.form.value));
  }

  onSubmit() {
    this.formData = JSON.stringify(this.form.value);
  }
}

