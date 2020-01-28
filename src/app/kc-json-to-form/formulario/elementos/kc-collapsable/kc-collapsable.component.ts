import { Component, OnInit, Injector, Inject, ComponentFactoryResolver, Host } from '@angular/core';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';

@Component({
  selector: 'kc-collapsable',
  templateUrl: './kc-collapsable.component.html',
  styleUrls: ['./kc-collapsable.component.css'],
  // providers:[DynamicComponent]
})
export class KcCollapsableComponent extends ElementoFormularioBase implements OnInit {

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
