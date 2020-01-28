import { Component, OnInit, Injector, Type, Inject } from '@angular/core';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';

@Component({
  selector: 'kc-area-texto',
  templateUrl: './kc-area-texto.component.html',
  styleUrls: ['./kc-area-texto.component.css']
})
export class KcAreaTextoComponent extends ElementoFormularioBase implements OnInit {
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
