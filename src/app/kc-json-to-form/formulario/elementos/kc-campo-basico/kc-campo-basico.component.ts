import { Component, OnInit, Injector, Inject } from '@angular/core';
// import {  } from '../../elemento-formulario/elemento-formulario.component';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';


@Component({
  selector: 'kc-campo-basico',
  templateUrl: './kc-campo-basico.component.html',
  styleUrls: ['./kc-campo-basico.component.css']
})
export class KcCampoBasicoComponent extends ElementoFormularioBase implements OnInit {
  injector: Injector;

  constructor(@Inject(Injector) injector: Injector) {
    super();
    this.injector = injector;
    this.tipoElemento = 'campoBasico';
  }

  ngOnInit() {
    this.setInputs(this.injector);
  }

}
