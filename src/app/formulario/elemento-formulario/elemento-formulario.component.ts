import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kc-elemento-formulario',
  templateUrl: './elemento-formulario.component.html',
  styleUrls: ['./elemento-formulario.component.css']
})
export class ElementoFormularioComponent implements OnInit {
  texto = '';
  value = '';
  tipoElemento = '';
  elementosFormulario: Array<ElementoFormularioComponent> = new Array<ElementoFormularioComponent>();


  constructor() { }

  ngOnInit() {

  }

}
