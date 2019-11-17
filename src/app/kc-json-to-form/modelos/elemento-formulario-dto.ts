import { ElementoFormularioBase } from './elemento-formulario-base';
import { KcCampoBasicoComponent } from '../formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { KcAreaTextoComponent } from '../formulario/elementos/kc-areatexto/kc-area-texto.component';
import { KcCollapsableComponent } from '../formulario/elementos/kc-collapsable/kc-collapsable.component';
import { Validacion } from './validacion';
import { ValidadoresService } from '../servicios/validadores.service';

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
      default:
        break;
    }
  }

}
