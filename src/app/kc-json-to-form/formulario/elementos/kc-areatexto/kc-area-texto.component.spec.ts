import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcAreaTextoComponent } from './kc-area-texto.component';
import { Injector, ViewChild, Component, ViewContainerRef, DebugElement } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AreaTextoComponent', () => {
  let component: KcAreaTextoComponent;
  let fixture: ComponentFixture<KcAreaTextoComponent>;
  let testInjector: Injector;
  let componenteHtml: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KcAreaTextoComponent],
      imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule],
      providers: [Injector]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(KcAreaTextoComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    testInjector = TestBed.get(Injector);
  });

  it('el elemento se crea con todas las propiedades correctamente', () => {
    const dataElemento = new ElementoFormularioBase({
      name: 'areaTest',
      texto: 'label del elemento',
      value: 'valor por Defecto'
    });
    const formulario = new FormGroup({ [dataElemento.name]: new FormControl(dataElemento.value, []) });
    spyOn(testInjector, 'get').and.callFake((token) => {
      switch (token) {
        case 'formulario':
          return formulario;
        case 'dataElemento':
          return dataElemento;
      }
    });
    fixture.detectChanges();
    componenteHtml = fixture.debugElement.query(By.css('.mat-form-field'));
    const input = componenteHtml.query(By.css('#' + dataElemento.name));
    const label = componenteHtml.query(By.css('label'));
    expect(component).toBeTruthy();
    expect(input).toBeTruthy();
    expect(input.nativeElement.value).toEqual(dataElemento.value);
    expect(label).toBeTruthy();
    expect(label.nativeElement.innerText).toEqual(dataElemento.texto);
  });


});
