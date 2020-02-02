import { Component, OnInit, Injector, Inject } from '@angular/core';
import { ElementoFormularioSeleccionable } from 'src/app/kc-json-to-form/modelos/elemento-formulario-seleccionable';
import { Opcion } from 'src/app/kc-json-to-form/modelos/interfaces';
import { CargarValoresService } from 'src/app/kc-json-to-form/servicios/cargar-valores.service';

@Component({
  selector: 'kc-combo',
  templateUrl: './kc-combo.component.html',
  styleUrls: ['./kc-combo.component.css']
})

export class KcComboComponent extends ElementoFormularioSeleccionable implements OnInit {
  injector: Injector;



  constructor(@Inject(Injector) injector: Injector, private cargaValoresService: CargarValoresService) {
    super();
    this.injector = injector;
    this.tipoElemento = 'combo';
    this.cargarValoresService = cargaValoresService;
  }

  ngOnInit() {
    //TODO: esta propiedad hay que pasarla en el objeto principal o crear uno nuevo
    this.setInputs<ElementoFormularioSeleccionable>(this.injector);
    this.cargarValoresInciales();
  }
}

