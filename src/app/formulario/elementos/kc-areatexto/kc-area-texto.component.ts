import { Component, OnInit, Injector, Type } from '@angular/core';
import { ElementoFormularioComponent } from '../../elemento-formulario/elemento-formulario.component';

@Component({
  selector: 'kc-area-texto',
  templateUrl: './kc-area-texto.component.html',
  styleUrls: ['./kc-area-texto.component.css']
})
export class AreaTextoComponent extends ElementoFormularioComponent implements OnInit {

  constructor(private injector: Injector) {
    super();
    this.tipoElemento = 'areaTexto';
  }

  ngOnInit() {
    this.setInputs(this.injector);
  }

}
