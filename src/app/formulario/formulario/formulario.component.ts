import { Component, OnInit } from '@angular/core';
import { AreaTextoComponent } from '../areatexto/area-texto.component';
import { CampoBasicoComponent } from '../campo-basico/campo-basico.component';
import { ElementoFormularioModel } from 'src/app/modelos/elemento-formulario-model';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';

@Component({
  selector: 'kc-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  // elementosFormulario: Array<ElementoFormularioComponent> = new Array<ElementoFormularioComponent>();
  elementosFormulario: Array<any> = new Array<any>();
  dataElemento: any = {
    component: AreaTextoComponent,
    inputs: {
      texto: 'area de texto dinámico'
    }
  };

  constructor() { }

  ngOnInit() {
    // const elementos: ElementoFormularioComponent = new ElementoFormularioComponent();
    // this.elementosFormulario = elementos.render();
    const area1: any = {
      component: AreaTextoComponent,
      inputs: {
        texto: 'area 1 de texto dinámico'
      }
    };
    const area2: ElementoFormularioModel = new ElementoFormularioModel();
    area2.buildWithComponent(CampoBasicoComponent)
          .buildWithInputs(
            new DataElementoFormularioModel()
              .buildWithTexto('campobasico 1')
              .buildWithId('campo1')
          );
    this.elementosFormulario.push(area1);
    this.elementosFormulario.push(area2);

  }

  render() {

  }
}
