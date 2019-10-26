import { Component, OnInit, Injector } from '@angular/core';
import { ElementoFormularioComponent } from '../../elemento-formulario/elemento-formulario.component';

@Component({
  selector: 'kc-kc-combo',
  templateUrl: './kc-combo.component.html',
  styleUrls: ['./kc-combo.component.css']
})
export class KcComboComponent extends ElementoFormularioComponent implements OnInit {

  constructor(private injector: Injector) {
    super();
    this.tipoElemento = 'kc-combo';
  }

  ngOnInit() {
  }

}
