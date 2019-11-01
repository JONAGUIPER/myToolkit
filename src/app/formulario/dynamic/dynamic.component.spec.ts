import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponent } from './dynamic.component';
import { ComponentFactoryResolver, Injector } from '@angular/core';
import { KcCampoBasicoComponent } from '../elementos/kc-campo-basico/kc-campo-basico.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ElementoFormularioBase } from 'src/app/modelos/elemento-formulario-base';

describe('DynamicComponent', () => {
  let component: DynamicComponent;
  let fixture: ComponentFixture<DynamicComponent>;
  let componentFactoryResolver: ComponentFactoryResolver;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicComponent, KcCampoBasicoComponent],
      providers: [Injector],
      imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [KcCampoBasicoComponent],
      }
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponent);
    component = fixture.componentInstance;
    componentFactoryResolver = fixture.debugElement.injector.get(ComponentFactoryResolver);
    fixture.detectChanges();
  });

  it('se crea una instacia del componente', () => {
    expect(component).toBeTruthy();
  });

  it('se crea una instacia del componente con datos componente vacio', () => {
    component.componentData = null;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('se crea un componente campo basico con su datos asociados', () => {
    const dataComponenteBasico = {
      component: KcCampoBasicoComponent,
      inputs: {
        dataElemento: new ElementoFormularioBase({
          texto: 'hola Campo Basico',
          name: 'inputTest',
          value: '',
          elementosGrupo: null,
        })
      }
    };
    const formulario = new FormGroup({
      [dataComponenteBasico.inputs.dataElemento.name]: new FormControl(
        dataComponenteBasico.inputs.dataElemento.value, [])
    });

    component.formulario = formulario;
    component.componentData = dataComponenteBasico;

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.currentComponent.instance instanceof KcCampoBasicoComponent).toBeTruthy();
  });
});
