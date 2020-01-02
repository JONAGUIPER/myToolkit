import { Component, OnInit, Injector, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementoFormularioSeleccionable } from 'src/app/kc-json-to-form/modelos/elemento-formulario-seleccionable';
import { Opcion } from 'src/app/kc-json-to-form/modelos/interfaces';
import { CargarValoresService } from 'src/app/kc-json-to-form/servicios/cargar-valores.service';



export interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'kc-combo',
  templateUrl: './kc-combo.component.html',
  styleUrls: ['./kc-combo.component.css']
})

export class KcComboComponent extends ElementoFormularioSeleccionable implements OnInit {
  injector: Injector;
  opciones: Opcion[] = [];
  cargarValoresService: CargarValoresService;


  constructor(@Inject(Injector) injector: Injector, cargaValoresService: CargarValoresService) {
    super();
    this.injector = injector;
    this.tipoElemento = 'combo';
    this.cargarValoresService = cargaValoresService;
  }


  ngOnInit() {
    //todo esta propiedad hay que pasarla en el objeto principal o crear uno nuevo

    this.setInputs<ElementoFormularioSeleccionable>(this.injector);
    this.cargarValoresService
      .execute(this.cargarValores)
      .subscribe((valores) => {
        this.opciones.length = 0;
        valores.forEach((valor) => {
          this.opciones.push(valor);
        });
    });
    // this.opciones.push({ value: '1', caption: 'valor1' });
    // this.opciones.push({ value: '2', caption: 'valor2' });
    // Create observer object
    // const myObserver = {
    //   next: x => console.log('Observer got a next value: ' + x.caption),
    //   error: err => console.error('Observer got an error: ' + err),
    //   complete: () => console.log('Observer got a complete notification'),
    // };
    // this.opcionesObservables = of([
    //   { value: '1', caption: 'valor1' },
    //   { value: '2', caption: 'valor2' }]);
    // // Execute with the observer object
    // this.opcionesObservables.subscribe(myObserver);

  }



}

