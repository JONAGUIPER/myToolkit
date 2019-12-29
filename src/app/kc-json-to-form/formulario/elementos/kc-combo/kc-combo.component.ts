import { Component, OnInit, Injector, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementoFormularioSeleccionable } from 'src/app/kc-json-to-form/modelos/elemento-formulario-seleccionable';


export interface Opcion {
  value: string;
  caption: string;
}

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
  opcionesObservables: Observable<Array<Opcion>>;
  opciones: Opcion[] = [];


  constructor(@Inject(Injector) injector: Injector) {
    super();
    this.injector = injector;
    this.tipoElemento = 'combo';

  }

  
  ngOnInit() {
    //todo esta propiedad hay que pasarla en el objeto principal o crear uno nuevo

    this.setInputs(this.injector);
    this.opciones.push({ value: '1', caption: 'valor1' });
    this.opciones.push({ value: '2', caption: 'valor2' });
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

