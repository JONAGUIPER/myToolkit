import { ElementoFormularioBase } from './elemento-formulario-base';
import { KcCampoBasicoComponent } from '../formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { KcAreaTextoComponent } from '../formulario/elementos/kc-areatexto/kc-area-texto.component';
import { KcCollapsableComponent } from '../formulario/elementos/kc-collapsable/kc-collapsable.component';
import { KcComboComponent } from '../formulario/elementos/kc-combo/kc-combo.component';

export class ElementoFormularioDto {
  component: any;
  inputs: any;

  constructor(datosInput: any) {
    this.component = this.getObjectComponent(datosInput.tipoElemento);
    this.inputs = { dataElemento: new ElementoFormularioBase(datosInput) };
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
      default:
        throw new Error('No ha indicado un elemento de formulario correcto: (' + componentName + ')');
    }
  }

}
