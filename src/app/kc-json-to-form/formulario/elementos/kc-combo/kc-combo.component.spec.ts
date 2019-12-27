import { async, ComponentFixture, TestBed, inject, fakeAsync, flush } from '@angular/core/testing';

import { KcComboComponent } from './kc-combo.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { Injector, DebugElement } from '@angular/core';
import { ValidadoresService } from 'src/app/kc-json-to-form/servicios/validadores.service';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';
import { MaterialModule } from 'src/app/material/material.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';

fdescribe('KcComboComponent', async () => {
  
  
  let componenteHtml: DebugElement;
  let testInjector: Injector;
  let overlayContainer: OverlayContainer;
  let platform: Platform;
  let overlayContainerElement: HTMLElement;

  function configureMatSelectTestingModule(declarations: any[], providers: any[]) {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
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

  beforeEach(() => {

  });
  describe('asignacion de caracteristicas obligatorias', () => {
    let fixture: ComponentFixture<KcComboComponent>;
    let instance: KcComboComponent;
    let dataElemento = new ElementoFormularioBase({
      name: 'comboTest',
      texto: 'label del comboTest',
      value: ''
    });
    let formulario = new FormGroup({
      [dataElemento.name]: new FormControl(dataElemento.value, [])
    });
    let providers = [
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
      fixture.detectChanges();
      flush();
      const trigger = fixture.debugElement.query(By.css('.mat-select-trigger'))!.nativeElement;
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

});
