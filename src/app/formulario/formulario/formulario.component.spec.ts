import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { DynamicComponent } from '../dynamic/dynamic.component';
import { MatFormField, MatError } from '@angular/material';
import { FormGroupFactoryService } from 'src/app/servicios/form-group-factory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { ValidadoresService } from 'src/app/servicios/validadores.service';
import { CondicionalesService } from 'src/app/servicios/condicionales.service';

class MockFormGroupFactoryService extends FormGroupFactoryService {
  toFormGroup() {
    const fieldControl: any = {};
    fieldControl['campo1'] = new FormControl('', Validators.required);
    return new FormGroup(fieldControl);
  }
}

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let formGroupFactoryServiceStub: FormGroupFactoryService;
  let testFormGroupFactory: FormGroupFactoryService;
  let testValidacionesService: ValidadoresService;
  let mockFormGroupFactory: FormGroupFactoryService;
  let mockComponent: FormularioComponent;

  let modeloRender: any;
  let testCodicionesService: CondicionalesService;
  beforeAll(function () {
    const camposJson = `{
      "elementosFormulario": [
        {
          "name": "campo1",
          "tipoElemento": "campoBasico",
          "texto": "holamundo campobasico",
          "obligatorio":true
        },
        {
          "name": "area1",
          "tipoElemento": "areaTexto",
          "texto": "holamundo AreaTexto"
        },
        {
          "name": "mi form collapsable",
          "tipoElemento": "collapsable",
          "texto": "holamundo collapsable",
          "elementosGrupo": [
            {
              "name": "campo1Colapsable",
              "tipoElemento": "campoBasico",
              "texto": "holamundo campoBasico collapsable"
            },
            {
              "name": "area1Collapsable",
              "tipoElemento": "areaTexto",
              "texto": "holamundo AreaTexto collapsable"
            }
          ]
        }
      ]
    }`;
    modeloRender = JSON.parse(camposJson);
  });

  beforeEach(() => {
    testCodicionesService = new CondicionalesService();
    const servicioValidaciones = new ValidadoresService(testCodicionesService);
    testFormGroupFactory = new FormGroupFactoryService(servicioValidaciones);
    component = new FormularioComponent(testFormGroupFactory, testValidacionesService);
    mockFormGroupFactory = new MockFormGroupFactoryService(servicioValidaciones);
    mockComponent = new FormularioComponent(mockFormGroupFactory, testValidacionesService);
    /*
        TestBed.configureTestingModule({
          declarations: [FormularioComponent,
            DynamicComponent,
            MatFormField, MatError],
          providers: [FormGroupFactoryService]
        });*/
    /*TestBed.overrideComponent(
      FormularioComponent,
      {
        set: {
          providers: [{
            provide: FormGroupFactoryService,
            useClass: MockFormGroupFactoryService
          }]
        }
      }
    );
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    testFormGroupFactory = TestBed.get(FormGroupFactoryService);
    //mockFormGroupFactory = fixture.debugElement.injector.get(FormGroupFactoryService);
    fixture.detectChanges();*/
  });

  afterEach(() => {
    testFormGroupFactory = null;
    component = null;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create con servicio mockeado', () => {
    expect(mockComponent).toBeTruthy();
  });
});
