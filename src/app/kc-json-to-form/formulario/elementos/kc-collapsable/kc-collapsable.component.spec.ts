import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';

import { KcCollapsableComponent } from './kc-collapsable.component';
import { Injector, DebugElement, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatExpansionModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementoFormularioBase } from 'src/app/kc-json-to-form/modelos/elemento-formulario-base';
import { ElementoFormularioDto } from 'src/app/kc-json-to-form/modelos/elemento-formulario-dto';
import { KcAreaTextoComponent } from '../kc-areatexto/kc-area-texto.component';
import { KcCampoBasicoComponent } from '../kc-campo-basico/kc-campo-basico.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

// TODO: seguir investigando y si es necesario testear que se rendericen los elementos del grupo
describe('CollapsableComponent', () => {
  let component: KcCollapsableComponent;
  let fixture: ComponentFixture<KcCollapsableComponent>;
  let testInjector: Injector;
  let testFactoryResolver: ComponentFactoryResolver;
  let componentService: ComponentFactoryResolver;

  const dataElemento = new ElementoFormularioBase({
    name: 'collapsableTest',
    texto: 'label del elemento en Test',
    tipoElemento: 'collapsable',
    elementosGrupo: [
      /* new ElementoFormularioDto({
         name: 'campo1Colapsable en',
         tipoElemento: 'campoBasico',
         texto: 'holamundo campoBasico collapsable en Test',
         value: 'valorDefecto1'
       }),
       new ElementoFormularioDto({
         name: 'area1Collapsable',
         tipoElemento: 'areaTexto',
         texto: 'holamundo AreaTexto collapsable en Test',
         value: 'valorDefecto2'
       })*/
    ]
  });

  // const formulario = new FormGroup({
  //   [dataElemento.elementosGrupo[0].inputs.name]:
  //     new FormControl(dataElemento.elementosGrupo[0].inputs.value, []),
  //   [dataElemento.elementosGrupo[1].inputs.name]:
  //     new FormControl(dataElemento.elementosGrupo[1].inputs.value, [])
  // });
  const formulario = new FormGroup({['campoVacio']: new FormControl()});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KcCollapsableComponent,
        DynamicComponent,
        //KcCampoBasicoComponent,
        //KcAreaTextoComponent,
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
      ///schemas: [NO_ERRORS_SCHEMA]

    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          //KcCollapsableComponent,
          //DynamicComponent,
          KcCampoBasicoComponent,
          KcAreaTextoComponent
        ],
        //providers: [{ provide: ComponentFactoryResolver, useValue: TestBed.get(ComponentFactoryResolver) }]
      }
    });
    /*TestBed.overrideComponent(DynamicComponent,{
      set:{//TODO: HACER UN MOCK PARA DE ComponentFactoryResolver PARA QUE REGRESE LAS INSTANCIAS QUE SE QUIEREN
        providers: [{ provide: AuthService, useClass: MockAuthService }] 
      }
    })*/
    //.overrideProvider(ComponentFactoryResolver, { useValue: testFactoryResolver });
    TestBed.compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcCollapsableComponent);
    component = fixture.componentInstance;
    testInjector = TestBed.get(Injector);
    testFactoryResolver = TestBed.get(ComponentFactoryResolver);
    componentService = fixture.debugElement.injector.get(ComponentFactoryResolver);

    spyOn(testInjector, 'get').and.callFake((token) => {
      switch (token) {
        case 'formulario':
          return formulario;
        case 'dataElemento':
          return dataElemento;
      }
    });
    /*spyOn(testFactoryResolver, 'resolveComponentFactory').and.callFake((componente) => {
      return testFactoryResolver.resolveComponentFactory(componente);
    });*/

    fixture.detectChanges();
  });

  it('se crea una instancia correctamente', () => {
    expect(component).toBeTruthy();
  });
  /*it('se crea una instancia correctamente con componentfactory injectado',
    inject([ComponentFactoryResolver], (factoria: ComponentFactoryResolver) => {
      expect(factoria).toBe(componentService);
      //expect(component).toBeTruthy();
    })
  );*/
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
