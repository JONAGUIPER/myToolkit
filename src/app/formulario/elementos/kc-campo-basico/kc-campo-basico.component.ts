import { Component, OnInit, Injector, Inject } from '@angular/core';
import { ElementoFormularioComponent } from '../../elemento-formulario/elemento-formulario.component';


@Component({
  selector: 'kc-campo-basico',
  templateUrl: './kc-campo-basico.component.html',
  styleUrls: ['./kc-campo-basico.component.css']
})
export class KcCampoBasicoComponent extends ElementoFormularioComponent implements OnInit {
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
