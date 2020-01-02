import { Injectable } from '@angular/core';
import { CargarValores, Opcion, ValorFijo, Service } from '../modelos/interfaces';
import { Observable, Subject, of } from 'rxjs';
import { Idiomas } from '../enumeradores/idiomas.enum';

@Injectable({
  providedIn: 'root'
})
export class CargarValoresService {


  constructor() { }

  execute(definicion: CargarValores): Observable<Opcion[]> {
    if (definicion.valoresFijos) {
      return this.obtenerValoresFijos(definicion.valoresFijos);
    } else if (definicion.service) {
      return this.obtenerValoresService(definicion.service);
    } else {
      throw new Error('se debe establecer una manera de obtener los datos');
    }
  }
  private obtenerValoresFijos(valoresFijos: ValorFijo[]): Observable<Opcion[]> {
    const opciones: Opcion[] = [];
    if (valoresFijos.length > 0) {
      valoresFijos.forEach((valorFijo) => {
        let captionEnIdioma = '';
        valorFijo.texto.forEach((texto) => {
          if (texto.idioma === Idiomas.ES) {
            captionEnIdioma = texto.value;
          }
        });
        opciones.push({
          value: valorFijo.value,
          caption: captionEnIdioma
        });
      });
    }
    return of(opciones).pipe();
  }
  private obtenerValoresService(servicio: Service): Observable<Opcion[]> {

    return null;
  }
}
// Tu subject deberia ser privado, asi proteges su funcionalidad.
const sub = new Subject<boolean>();

// Tu funcion para solicitar el cambio
function mostrarComponentes(mostrar: boolean = true): void {
  sub.next(mostrar);
}

// Tu observable, el cual se puede exponer y extender con otros operadores
function mostrarComponentesObs(): Observable<boolean> {
  return sub.asObservable();
}
