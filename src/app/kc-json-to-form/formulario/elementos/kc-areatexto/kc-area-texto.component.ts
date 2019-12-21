import { Component, OnInit, Injector, Type, Inject } from '@angular/core';
import { ElementoFormularioComponent } from '../../elemento-formulario/elemento-formulario.component';

@Component({
  selector: 'kc-area-texto',
  templateUrl: './kc-area-texto.component.html',
  styleUrls: ['./kc-area-texto.component.css']
})
export class KcAreaTextoComponent extends ElementoFormularioComponent implements OnInit {
  injector: Injector;
  constructor(@Inject(Injector) injector: Injector) {
    super();
    this.injector = injector;
    this.tipoElemento = 'areaTexto';
  }

  ngOnInit() {
    this.setInputs(this.injector);
  }

}
