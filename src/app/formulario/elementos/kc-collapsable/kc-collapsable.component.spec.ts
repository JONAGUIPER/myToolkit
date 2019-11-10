import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { KcCollapsableComponent } from './kc-collapsable.component';
import { Injector, DebugElement, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementoFormularioBase } from 'src/app/modelos/elemento-formulario-base';
import { ElementoFormularioDto } from 'src/app/modelos/elemento-formulario-dto';
import { KcAreaTextoComponent } from '../kc-areatexto/kc-area-texto.component';
import { KcCampoBasicoComponent } from '../kc-campo-basico/kc-campo-basico.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { ElementoFormularioComponent } from '../../elemento-formulario/elemento-formulario.component';

// TODO: seguir investigando y si es necesario testear que se rendericen los elementos del grupo
describe('CollapsableComponent', () => {
  let component: KcCollapsableComponent;
  let fixture: ComponentFixture<KcCollapsableComponent>;
  let testInjector: Injector;
  let testFactoryResolver: ComponentFactoryResolver;

  const dataElemento = new ElementoFormularioBase({
    name: 'collapsableTest',
    texto: 'label del elemento',
    tipoElemento: 'collapsable',
    elementosGrupo: [
      new ElementoFormularioDto({
        name: 'campo1Colapsable',
        tipoElemento: 'campoBasico',
        texto: 'holamundo campoBasico collapsable',
        value: 'valorDefecto1'
      }),
      new ElementoFormularioDto({
        name: 'area1Collapsable',
        tipoElemento: 'areaTexto',
        texto: 'holamundo AreaTexto collapsable',
        value: 'valorDefecto2'
      })
    ]
  });

  const formulario = new FormGroup({
    [dataElemento.elementosGrupo[0].inputs.name]:
      new FormControl(dataElemento.elementosGrupo[0].inputs.value, []),
    [dataElemento.elementosGrupo[1].inputs.name]:
      new FormControl(dataElemento.elementosGrupo[1].inputs.value, [])
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        KcCollapsableComponent,
        // DynamicComponent,
        KcCampoBasicoComponent,
        KcAreaTextoComponent,
        ElementoFormularioComponent,
        KcCollapsableComponent
      ],

      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        Injector,
      ],
      schemas: [NO_ERRORS_SCHEMA]

    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          // DynamicComponent,
          KcCollapsableComponent,
          KcCampoBasicoComponent,
          KcAreaTextoComponent,
          KcCollapsableComponent
        ]
      }
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(KcCollapsableComponent);
    component = fixture.componentInstance;
    testInjector = TestBed.get(Injector);
    testFactoryResolver = TestBed.get(ComponentFactoryResolver);


    spyOn(testInjector, 'get').and.callFake((token) => {
      switch (token) {
        case 'formulario':
          return formulario;
        case 'dataElemento':
          return dataElemento;
      }
    });
    spyOn(testFactoryResolver, 'resolveComponentFactory').and.callFake((componente) => {
      return testFactoryResolver.resolveComponentFactory(componente);
    });

    fixture.detectChanges();
  });

  it('se crea una instancia correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('las propiedades visibles se han establecido correctamente', () => {
    const componenteHtml: DebugElement = fixture.debugElement.query(By.css('.mat-accordion'));
    const tituloCollapsable = componenteHtml.query(By.css('mat-panel-title'));
    expect(tituloCollapsable).toBeTruthy();
    expect(tituloCollapsable.nativeElement.innerText).toEqual(dataElemento.texto);

    const idColapsable = componenteHtml.query(By.css('mat-expansion-panel'));
    expect(idColapsable).toBeTruthy();
    expect(idColapsable.nativeElement.id).toEqual(dataElemento.name);

  });
});
