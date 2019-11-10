import { Component, OnInit, Injector, Inject, ComponentFactoryResolver, Host } from '@angular/core';
import { ElementoFormularioComponent } from '../../elemento-formulario/elemento-formulario.component';
import { DynamicComponent } from '../../dynamic/dynamic.component';

@Component({
  selector: 'kc-collapsable',
  templateUrl: './kc-collapsable.component.html',
  styleUrls: ['./kc-collapsable.component.css'],
  // providers:[DynamicComponent]
})
export class KcCollapsableComponent extends ElementoFormularioComponent implements OnInit {

  panelOpenState: boolean;
  injector: Injector;
  constructor(@Inject(Injector) injector: Injector) {
    super();
    this.injector = injector;
    this.tipoElemento = 'collapsable';
  }

  ngOnInit() {
    // this.texto = this.injector.get<string>('texto' as any);
    // this.name = this.injector.get<string>('name' as any);
    this.panelOpenState = false;
    this.setInputs(this.injector);
  }

}
