import { TestBed, fakeAsync, flush, async, tick } from '@angular/core/testing';
import { CargarValoresService } from './cargar-valores.service';
import { CargarValores, ValorFijoSeleccionable, Opcion } from '../modelos/interfaces';
import { Observable } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LogServicesInterceptor } from '../Interceptors/log-services-interceptor';

describe('CargarValoresService', () => {
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      // { provide: HTTP_INTERCEPTORS, useClass: LogServicesInterceptor, multi: true }
    ]
  }));

  it('se puede instanciar el servicio', () => {
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    expect(service).toBeTruthy();
  });

  it('se devuelven opciones configuradas como valor fijo', fakeAsync(() => {
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    const definicionCargaValores: CargarValores = {
      valoresFijos: [
        {
          value: 'valor1',
          texto: [
            { idioma: 'es', value: 'caption para valor1 ES' },
            { idioma: 'en', value: 'caption para valor1 EN' },
          ]
        },
        {
          value: 'valor2',
          texto: [
            { idioma: 'es', value: 'caption para valor2 ES' },
            { idioma: 'en', value: 'caption para valor2 EN' },
          ]
        },
        {
          value: 'valor3',
          texto: [
            { idioma: 'es', value: 'caption para valor3 ES' },
            { idioma: 'en', value: 'caption para valor3 EN' },
          ]
        }
      ]
    };
    const opciones$ = service.execute(definicionCargaValores);
    tick();
    opciones$.subscribe((valores) => {
      expect(valores.length).toEqual(3);
      expect(valores[2].value).toEqual(definicionCargaValores.valoresFijos[2].value);
    });
  }));

  it('se devuelven opciones obtenidas por Servicio CON parseo de datos', () => {
    httpMock = TestBed.get(HttpTestingController);
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    const valoresRetorno: any = [
      {
        id: 24,
        name: "The End Of History"
      },
      {
        id: 137,
        name: "Sink The Bismarck!"
      },
      {
        id: 185,
        name: "Tactical Nuclear Penguin"
      }
    ];
    const definicionCargaValores: CargarValores = {
      service: {
        servicio: {
          operation: 'beers',
          url: 'https://api.punkapi.com/v2/'
        },
        parametros: [
          { nombreParametro: 'brewed_before', valorFijo: '11-2012' },
          { nombreParametro: 'abv_gt', valorFijo: '20' }
        ],
        respuesta: {
          value: 'id',
          caption: 'name'
        }
      }
    };
    const opciones$ = service.execute(definicionCargaValores);
    //tick();
    opciones$.subscribe((valores) => {
      expect(valores.length).toEqual(3);
      expect(valores[2].value).toEqual(valoresRetorno[2].id);
    });

    const request = httpMock.expectOne(definicionCargaValores.service.servicio.url +
      definicionCargaValores.service.servicio.operation);
    expect(request.request.method).toBe('GET');
    request.flush(valoresRetorno);
  });
  // TODO: HACER UN TEST DE SERVICIO SIN PARAMETROS
  it('se devuelven opciones obtenidas por Servicio SIN parseo de datos', () => {
    httpMock = TestBed.get(HttpTestingController);
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    const valoresRetorno: any = [
      {
        value: 24,
        caption: "The End Of History"
      },
      {
        value: 137,
        caption: "Sink The Bismarck!"
      },
      {
        value: 185,
        caption: "Tactical Nuclear Penguin"
      }
    ];
    const definicionCargaValores: CargarValores = {
      service: {
        servicio: {
          operation: 'beers',
          url: 'https://api.punkapi.com/v2/'
        },
        parametros: [
          { nombreParametro: 'brewed_before', valorFijo: '11-2012' },
          { nombreParametro: 'abv_gt', valorFijo: '20' }
        ]
      }
    };
    const opciones$ = service.execute(definicionCargaValores);

    opciones$.subscribe((valores) => {
      expect(valores.length).toEqual(3);
      expect(valores[2].value).toEqual(valoresRetorno[2].value);
    });
    const request = httpMock.expectOne(definicionCargaValores.service.servicio.url +
      definicionCargaValores.service.servicio.operation);
    expect(request.request.method).toBe('GET');
    request.flush(valoresRetorno);
  });

  it('se devuelve array vacio cuando la respuesta es vacia', () => {
    httpMock = TestBed.get(HttpTestingController);
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    const valoresRetorno: any = '';
    const definicionCargaValores: CargarValores = {
      service: {
        servicio: {
          operation: 'beers',
          url: 'https://api.punkapi.com/v2/'
        },
        parametros: [
          { nombreParametro: 'brewed_before', valorFijo: '11-2012' },
          { nombreParametro: 'abv_gt', valorFijo: '20' }
        ]
      }
    };
    const opciones$ = service.execute(definicionCargaValores);

    opciones$.subscribe((valores) => {
      expect(valores.length).toEqual(0);
      expect(valores).toEqual([]);
    });
    const request = httpMock.expectOne(definicionCargaValores.service.servicio.url +
      definicionCargaValores.service.servicio.operation);
    expect(request.request.method).toBe('GET');
    request.flush(valoresRetorno);
    httpMock.verify();
  });

  it('se devuelve array vacio cuando no hay conexion', () => {
    httpMock = TestBed.get(HttpTestingController);
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    const definicionCargaValores: CargarValores = {
      service: {
        servicio: {
          operation: 'beers',
          url: 'https://api.punkapi.com/v2/'
        },
        parametros: [
          { nombreParametro: 'brewed_before', valorFijo: '11-2012' },
          { nombreParametro: 'abv_gt', valorFijo: '20' }
        ]
      }
    };
    const opciones$ = service.execute(definicionCargaValores);
    opciones$.subscribe({
      next(valores) {
        fail('no debe pasar por aqui cuando la respuesta es un error');
      },
      error(error: HttpErrorResponse) {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
      },
      complete: () => {
        fail('no debe pasar por aqui cuando la respuesta es un error');
      }
    });
    const request = httpMock.expectOne(definicionCargaValores.service.servicio.url +
      definicionCargaValores.service.servicio.operation);
    const errorEvent: ErrorEvent = new ErrorEvent('Not Found');
    request.error(errorEvent, { status: 404, statusText: 'Not Found' });
  });
});
