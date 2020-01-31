import { Component, OnInit, Injector, Inject } from '@angular/core';
import { ElementoFormularioSeleccionable } from 'src/app/kc-json-to-form/modelos/elemento-formulario-seleccionable';
import { Opcion } from 'src/app/kc-json-to-form/modelos/interfaces';
import { CargarValoresService } from 'src/app/kc-json-to-form/servicios/cargar-valores.service';

@Component({
  selector: 'kc-radio',
  templateUrl: './kc-radio.component.html',
  styleUrls: ['./kc-radio.component.css']
})
export class KcRadioComponent extends ElementoFormularioSeleccionable implements OnInit {

  injector: Injector;
  opciones: Opcion[] = [];
  cargarValoresService: CargarValoresService;


  constructor(@Inject(Injector) injector: Injector, private cargaValoresService: CargarValoresService) {
    super();
    this.injector = injector;
    this.tipoElemento = 'radio';
    this.cargarValoresService = cargaValoresService;
  }
  ngOnInit() {
    this.setInputs<ElementoFormularioSeleccionable>(this.injector);
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
  }

}
