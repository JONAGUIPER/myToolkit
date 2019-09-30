import { Component, OnInit, Injector } from '@angular/core';
import { ElementoFormularioComponent } from '../elemento-formulario/elemento-formulario.component';

@Component({
  selector: 'kc-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.css']
})
export class CollapsableComponent extends ElementoFormularioComponent implements OnInit {

  panelOpenState: boolean;
  constructor(private injector: Injector) {
    super();
    this.tipoElemento = 'collapsable';
  }

  ngOnInit() {
    // this.texto = this.injector.get<string>('texto' as any);
    // this.name = this.injector.get<string>('name' as any);
    this.panelOpenState = false;
    this.setInputs(this.injector);
  }

}
