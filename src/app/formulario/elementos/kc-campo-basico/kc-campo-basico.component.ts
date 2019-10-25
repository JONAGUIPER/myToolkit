import { Component, OnInit, Injector } from '@angular/core';
import { ElementoFormularioComponent } from '../../elemento-formulario/elemento-formulario.component';


@Component({
  selector: 'kc-campo-basico',
  templateUrl: './kc-campo-basico.component.html',
  styleUrls: ['./kc-campo-basico.component.css']
})
export class CampoBasicoComponent extends ElementoFormularioComponent implements OnInit {

  constructor(private injector: Injector) {
    super();
    this.tipoElemento = 'campoBasico';
  }

  ngOnInit() {
    this.setInputs(this.injector);
  }

}
