import { Component, OnInit, Injector } from '@angular/core';
import { ElementoFormularioComponent } from '../elemento-formulario/elemento-formulario.component';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';

@Component({
  selector: 'kc-campo-basico',
  templateUrl: './campo-basico.component.html',
  styleUrls: ['./campo-basico.component.css']
})
export class CampoBasicoComponent extends DataElementoFormularioModel implements OnInit {


  constructor(private injector: Injector) {
    super();
    this.tipoElemento = 'campoBasico';
  }

  ngOnInit() {
    this.texto = this.injector.get<string>('texto' as any);
  }

}
