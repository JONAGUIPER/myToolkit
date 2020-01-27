import { Injectable } from '@angular/core';
import { CargarValores, Opcion, ValorFijoSeleccionable, Service, ParametroWS } from '../modelos/interfaces';
import { Observable, of, ObservableInput, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Idiomas } from '../enumeradores/idiomas.enum';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargarValoresService {
  constructor(private clienteHttp: HttpClient) { }

  execute(definicion: CargarValores): Observable<Opcion[]> {
    if (definicion.valoresFijos) {
      return this.obtenerValoresFijos(definicion.valoresFijos);
    } else if (definicion.service) {
      return this.obtenerValoresService(definicion.service);
    } else {
      throw new Error('se debe establecer una manera de obtener los datos');
    }
  }

  private obtenerValoresFijos(valoresFijos: ValorFijoSeleccionable[]): Observable<Opcion[]> {
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
    const parametros: HttpParams = this.obtenerParametrosServicio(servicio.parametros);
    let respuestaWS;
    try {
      respuestaWS = this.clienteHttp
        .get<Opcion[]>(servicio.servicio.url + servicio.servicio.operation, { params: parametros });
      // respuestaWS.subscribe(
      //     res => { console.log('respuesta correcta: ' + res); },
      //     (error: HttpErrorResponse) => {
      //       console.log('respuesta error: ' + error);
      //     }
      //   );
    } catch (error) {
      console.log('ESTOY EN EL CATCH');
    }
    // return respuestaWS;
    return this.tratarRespuesta(respuestaWS, servicio.respuesta);
  }

  private tratarRespuesta(respuestaWS: Observable<any>, parseoRespuesta: Opcion): Observable<Opcion[]> {
    const respuestaParseada: Observable<any> = respuestaWS.pipe(
      catchError((error: ObservableInput<any>) => {
        return throwError(error);
        //return of([]);
      }),
      map(items => {
        let resp: Opcion[] = [];
        if (items.length !== 0) {
          if (parseoRespuesta) {
            items.map((item: any) => {
              resp.push({ value: item.id, caption: item.name });
            });
          } else {
            resp = items;
          }
        }
        return resp;
      })

    );
    return respuestaParseada;
  }


  private obtenerParametrosServicio(parametros: ParametroWS[]): HttpParams {
    const parametrosParaUsar: HttpParams = new HttpParams();
    parametros.map((parametro) => {
      if (parametro.valorFijo) {
        parametrosParaUsar.set(parametro.nombreParametro, parametro.valorFijo);
      } else if (parametro.nombreCampo) {
        parametrosParaUsar.set(parametro.nombreParametro, parametro.nombreCampo);
      } else {
        throw new Error('no se ha informado un parametro');
      }
    });
    return parametrosParaUsar;
  }
}
