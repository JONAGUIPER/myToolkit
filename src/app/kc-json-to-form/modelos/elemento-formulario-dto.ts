import { ElementoFormularioBase } from './elemento-formulario-base';
import { KcCampoBasicoComponent } from '../formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { KcAreaTextoComponent } from '../formulario/elementos/kc-areatexto/kc-area-texto.component';
import { KcCollapsableComponent } from '../formulario/elementos/kc-collapsable/kc-collapsable.component';
import { KcComboComponent } from '../formulario/elementos/kc-combo/kc-combo.component';
import { ElementoFormularioSeleccionable } from './elemento-formulario-seleccionable';
import { KcRadioComponent } from '../formulario/elementos/kc-radio/kc-radio.component';
import { KcCheckboxComponent } from '../formulario/elementos/kc-checkbox/kc-checkbox.component';

export class ElementoFormularioDto {
  component: any;
  inputs: any;

  constructor(datosInput: any) {
    this.component = this.getObjectComponent(datosInput.tipoElemento);
    if (datosInput.tipoElemento === 'combo') {
      this.inputs = { dataElemento: new ElementoFormularioSeleccionable(datosInput) };
    } else {
      this.inputs = { dataElemento: new ElementoFormularioBase(datosInput) };
    }
  }
  get elementosGrupo() {
    return this.inputs.dataElemento.elementosGrupo;
  }

  private getObjectComponent(componentName: string): any {
    switch (componentName) {
      case 'campoBasico':
        return KcCampoBasicoComponent;
      case 'areaTexto':
        return KcAreaTextoComponent;
      case 'collapsable':
        return KcCollapsableComponent;
      case 'combo':
        return KcComboComponent;
      case 'radio':
        return KcRadioComponent;
      case 'checkbox':
        return KcCheckboxComponent;
      default:
        throw new Error('No ha indicado un elemento de formulario correcto: (' + componentName + ')');
    }
  }

}
