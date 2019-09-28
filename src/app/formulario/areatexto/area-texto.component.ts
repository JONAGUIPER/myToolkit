import { Component, OnInit, Injector, Type } from '@angular/core';
import { ElementoFormularioComponent } from '../elemento-formulario/elemento-formulario.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kc-area-texto',
  templateUrl: './area-texto.component.html',
  styleUrls: ['./area-texto.component.css']
})
export class AreaTextoComponent extends ElementoFormularioComponent implements OnInit {

  constructor(private injector: Injector) {
    super();
    this.tipoElemento = 'areaTexto';
  }

  ngOnInit() {
    this.texto = this.injector.get<string>('texto' as any);
    this.name = this.injector.get<string>('name' as any);
    this.form = this.injector.get<FormGroup>('formulario' as any);
  }

}
