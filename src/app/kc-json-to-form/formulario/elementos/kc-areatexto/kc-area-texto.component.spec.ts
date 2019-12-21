import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcAreaTextoComponent } from './kc-area-texto.component';
import { Injector, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('AreaTextoComponent', () => {


  let component: KcAreaTextoComponent;
  let fixture: ComponentFixture<KcAreaTextoComponent>;
  let testInjector: Injector;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  @Component({
    selector: `kc-host-component`,
    template: `
    <form [formGroup]="form" id="idForm" name="idForm"><kc-area-texto></kc-area-texto></form>`
  })
  class TestHostComponent {
    @ViewChild('KcAreaTextoComponent', { static: false }) public areaTextoComponent: KcAreaTextoComponent;
    form: FormGroup;
  }

  beforeEach(/*async(*/() => {
    TestBed.configureTestingModule({
      declarations: [KcAreaTextoComponent, TestHostComponent],
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
  }/*)*/);

  /*beforeEach(() => {
    fixture = TestBed.createComponent(KcAreaTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/
  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  /*it('should create', async(inject( Injector, (injector: Injector) => {
    fixture = TestBed.createComponent(AreaTextoComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  })));*/
  it('should show TEST INPUT', () => {
    debugger;
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
    testHostComponent.form = formulario;
    let area = testHostComponent.areaTextoComponent;
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual(dataElemento.texto);
  });

  xit('should create', () => {
    debugger;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
