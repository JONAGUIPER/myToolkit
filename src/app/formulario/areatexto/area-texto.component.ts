import { Component, OnInit, Injector, Type } from '@angular/core';
import { ElementoFormularioComponent } from '../elemento-formulario/elemento-formulario.component';

@Component({
  selector: 'kc-area-texto',
  templateUrl: './area-texto.component.html',
  styleUrls: ['./area-texto.component.css']
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
