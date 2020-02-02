import { ElementoFormularioBase, IElementoFormularioBase } from './elemento-formulario-base';
import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CargarValores, Opcion } from './interfaces';
import { CargarValoresService } from '../servicios/cargar-valores.service';


export interface IElementoFormularioSeleccionable extends IElementoFormularioBase {
  cargarValores: CargarValores;
}
export class ElementoFormularioSeleccionable extends ElementoFormularioBase {
  cargarValores: CargarValores;
  opciones: Opcion[] = [];
  cargarValoresService: CargarValoresService;

  constructor(options: IElementoFormularioSeleccionable = { cargarValores: {} }) {
    super(options);
    this.cargarValores = options.cargarValores;
  }
  setInputs<ElementoFormularioSeleccionable>(injector: Injector): ElementoFormularioSeleccionable {
    //TODO: esto al parecer no es necesario ya al usar la interfaz se obtienen los datos 164solo llamar al padre para setear el formulario
    const dataElemento: ElementoFormularioSeleccionable = super.setInputs<ElementoFormularioSeleccionable>(injector);
    this.populate(dataElemento);
    return dataElemento;
  }
  populate<ElementoFormularioSeleccionable>(options) {
    super.populate(options);
    this.cargarValores = options.cargarValores;
  }
  cargarValoresInciales(): void {
    this.cargarValoresService
      .execute(this.cargarValores)
      .subscribe({
        next: (valores) => {
          this.opciones.length = 0;
          valores.forEach((valor) => {
            this.opciones.push(valor);
          });
        },
        error: (error: any) => {
          this.opciones = [];
        }
      });
  };

}
