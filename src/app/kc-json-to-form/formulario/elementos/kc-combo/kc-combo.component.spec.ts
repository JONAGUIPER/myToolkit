import { async, ComponentFixture, TestBed, inject, fakeAsync, flush } from '@angular/core/testing';

import { KcComboComponent } from './kc-combo.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { Injector, DebugElement } from '@angular/core';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ElementoFormularioSeleccionable } from 'src/app/kc-json-to-form/modelos/elemento-formulario-seleccionable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CargarValoresService } from 'src/app/kc-json-to-form/servicios/cargar-valores.service';
import { Opcion } from 'src/app/kc-json-to-form/modelos/interfaces';
import { LogServicesInterceptor } from 'src/app/kc-json-to-form/Interceptors/log-services-interceptor';

describe('KcComboComponent', async () => {
  let componenteHtml: DebugElement;
  let overlayContainer: OverlayContainer;
  let platform: Platform;
  let overlayContainerElement: HTMLElement;

  function configureMatSelectTestingModule(declarations: any[], providers: any[], importaciones: any[] = []) {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
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
    let fixture: ComponentFixture<KcComboComponent>;
    let instance: KcComboComponent;
    const dataElemento = new ElementoFormularioSeleccionable({
      name: 'comboTest',
      texto: 'label del comboTest',
      value: '',
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
        configureMatSelectTestingModule([KcComboComponent], providers);
        fixture = TestBed.createComponent(KcComboComponent);
        instance = fixture.componentInstance;
      }));

    it('asignacion del texto del label', fakeAsync(() => {
      // fixture = TestBed.createComponent(KcComboComponent);
      // instance = fixture.componentInstance;

      instance.ngOnInit();
      fixture.detectChanges();
      componenteHtml = fixture.debugElement.query(By.css('.mat-form-field'));
      const label = componenteHtml.query(By.css('label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.innerText).toEqual(dataElemento.texto);
    }));

    it('asignacion del id al componente', fakeAsync(() => {
      // fixture = TestBed.createComponent(KcComboComponent);
      // instance = fixture.componentInstance;

      instance.ngOnInit();
      fixture.detectChanges();
      flush();
      componenteHtml = fixture.debugElement.query(By.css('.mat-form-field'));
      const input = componenteHtml.query(By.css('#' + dataElemento.name));
      expect(input).toBeTruthy();
    }));

    it('cambia el valor cuando se cambia de opcion', fakeAsync(() => {
      // fixture = TestBed.createComponent(KcComboComponent);
      // instance = fixture.componentInstance;
      // expect(instance.form.get('comboTest').value)
      //     .toEqual(null, `Expected the control's value to be empty initially.`);
      instance.ngOnInit();
      fixture.detectChanges();
      flush();
      const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      trigger.click();
      fixture.detectChanges();
      flush();
      const option = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      option[1].click();
      fixture.detectChanges();
      flush();

      expect(instance.form.value[dataElemento.name]).toEqual('1');
    }));
  });

  describe('cargar opciones mediante servicios web', () => {
    let fixture: ComponentFixture<KcComboComponent>;
    let instance: KcComboComponent;
    const dataElemento = new ElementoFormularioSeleccionable({
      name: 'comboTest',
      texto: 'label del comboTest',
      value: '',
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
        configureMatSelectTestingModule([KcComboComponent], providers, importaciones);
        fixture = TestBed.createComponent(KcComboComponent);
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

      componenteHtml = fixture.debugElement.query(By.css('.mat-form-field'));
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
      const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      trigger.click();
      fixture.detectChanges();
      flush();
      const options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
      options[indexOpcionSelected].click();
      fixture.detectChanges();
      flush();

      expect(instance.form.value[dataElemento.name]).toEqual(valoresRetorno[indexOpcionSelected - 1].value);
      options.forEach((option, index) => {
        if (index > 0) {
          expect(option.innerText.trim()).toEqual(valoresRetorno[index - 1].caption);
        }
      });
    }));
  });
});

