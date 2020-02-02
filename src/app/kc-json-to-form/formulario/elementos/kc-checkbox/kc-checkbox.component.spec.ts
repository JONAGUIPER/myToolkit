import { async, ComponentFixture, TestBed, inject, fakeAsync, flush } from '@angular/core/testing';

import { KcCheckboxComponent } from './kc-checkbox.component';
import { DebugElement } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { MatFormFieldModule, MatRadioModule, MatList, MatListModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElementoFormularioSeleccionable } from 'src/app/kc-json-to-form/modelos/elemento-formulario-seleccionable';
import { By } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogServicesInterceptor } from 'src/app/kc-json-to-form/Interceptors/log-services-interceptor';
import { Opcion } from 'src/app/kc-json-to-form/modelos/interfaces';
import { CargarValoresService } from 'src/app/kc-json-to-form/servicios/cargar-valores.service';


describe('KcCheckboxComponent', async () => {
  let componenteHtml: DebugElement;
  let overlayContainer: OverlayContainer;
  let platform: Platform;
  let overlayContainerElement: HTMLElement;

  function configureMatSelectTestingModule(declarations: any[], providers: any[], importaciones: any[] = []) {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatListModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        importaciones
      ],
      declarations,
      providers,
    }).compileComponents();

    inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      platform = p;
    })();
  }
  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });


  describe('asignacion de caracteristicas obligatorias', () => {
    let fixture: ComponentFixture<KcCheckboxComponent>;
    let instance: KcCheckboxComponent;
    const dataElemento = new ElementoFormularioSeleccionable({
      name: 'checkboxtest',
      texto: 'label del checkboxtest',
      value: '',
      tipoElemento: 'checkbox',
      cargarValores: {
        valoresFijos: [
          {
            value: '1',
            texto: [
              { idioma: 'es', value: 'hola español' },
              { idioma: 'en', value: 'hola inglés' }

            ]
          },
          {
            value: '2',
            texto: [
              { idioma: 'es', value: 'adios español' },
              { idioma: 'en', value: 'adios inglés' }
            ]
          }]
      }
    });
    const formulario = new FormGroup({
      [dataElemento.name]: new FormControl(dataElemento.value, [])
    });
    const providers = [
      { provide: 'formulario', useValue: formulario },
      { provide: 'dataElemento', useValue: dataElemento },
    ];

    beforeEach(
      async(() => {
        configureMatSelectTestingModule([KcCheckboxComponent], providers);
        fixture = TestBed.createComponent(KcCheckboxComponent);
        instance = fixture.componentInstance;
      }));

    it('asignacion del texto del label', fakeAsync(() => {
      instance.ngOnInit();
      fixture.detectChanges();
      componenteHtml = fixture.debugElement.query(By.css('div'));
      const label = componenteHtml.query(By.css('label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.innerText).toEqual(dataElemento.texto);
    }));

    it('asignacion del id al componente', fakeAsync(() => {
      instance.ngOnInit();
      fixture.detectChanges();
      flush();
      componenteHtml = fixture.debugElement.query(By.css('div'));
      const input = componenteHtml.query(By.css('#' + dataElemento.name));
      expect(input).toBeTruthy();
    }));

    it('cambia el valor cuando se cambia de opcion', fakeAsync(() => {
      instance.ngOnInit();
      fixture.detectChanges();
      flush();
      const triggers = fixture.debugElement.queryAll(By.css('.mat-list-option'));
      triggers[0].nativeElement.click();
      fixture.detectChanges();
      flush();
      expect(instance.form.value[dataElemento.name]).toEqual([dataElemento.cargarValores.valoresFijos[0].value]);
      triggers[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      expect(instance.form.value[dataElemento.name]).toEqual(
        [dataElemento.cargarValores.valoresFijos[0].value, dataElemento.cargarValores.valoresFijos[1].value]);
    }));
  });

  describe('cargar opciones mediante servicios web', () => {
    let fixture: ComponentFixture<KcCheckboxComponent>;
    let instance: KcCheckboxComponent;
    const dataElemento = new ElementoFormularioSeleccionable({
      name: 'checkboxTest',
      texto: 'label del checkboxTest',
      value: '',
      tipoElemento: 'radio',
      cargarValores: {
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
      }
    });
    const formulario = new FormGroup({
      [dataElemento.name]: new FormControl(dataElemento.value, [])
    });
    const providers = [
      { provide: 'formulario', useValue: formulario },
      { provide: 'dataElemento', useValue: dataElemento },
      { provide: HTTP_INTERCEPTORS, useClass: LogServicesInterceptor, multi: true }
    ];
    const importaciones = [
      // HttpClientTestingModule,
    ];
    const valoresRetorno: Opcion[] = [
      {
        value: '24',
        caption: 'The End Of History'
      },
      {
        value: '137',
        caption: 'Sink The Bismarck!'
      },
      {
        value: '185',
        caption: 'Tactical Nuclear Penguin'
      }
    ];

    beforeEach(
      async(() => {
        configureMatSelectTestingModule([KcCheckboxComponent], providers, importaciones);
        fixture = TestBed.createComponent(KcCheckboxComponent);
        instance = fixture.componentInstance;
      }));

    it('respuesta de servicio con valores SIN Parseo', fakeAsync(() => {
      const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
      const service: CargarValoresService = TestBed.get(CargarValoresService);

      instance.ngOnInit();
      fixture.detectChanges();
      const request = httpMock.match(dataElemento.cargarValores.service.servicio.url +
        dataElemento.cargarValores.service.servicio.operation);
      expect(request[0].request.method).toBe('GET');
      request[0].flush(valoresRetorno);
      fixture.detectChanges();
      componenteHtml = fixture.debugElement.query(By.css('div'));
      const label = componenteHtml.query(By.css('label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.innerText).toEqual(dataElemento.texto);
      httpMock.verify();
    }));

    it('cambia el valor cuando se cambia de opcion', fakeAsync(() => {
      const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
      const indexOpcionSelected = 1;
      instance.ngOnInit();
      fixture.detectChanges();
      const request = httpMock.match(dataElemento.cargarValores.service.servicio.url +
        dataElemento.cargarValores.service.servicio.operation);
      expect(request[0].request.method).toBe('GET');
      request[0].flush(valoresRetorno);
      flush();
      fixture.detectChanges();
      const triggers = fixture.debugElement.queryAll(By.css('.mat-list-option'));
      triggers[0].nativeElement.click();
      fixture.detectChanges();
      flush();
      expect(instance.form.value[dataElemento.name]).toEqual([valoresRetorno[indexOpcionSelected - 1].value]);

    }));

  });
});
