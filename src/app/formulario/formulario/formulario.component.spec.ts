import { ComponentFixture } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { FormGroupFactoryService } from 'src/app/servicios/form-group-factory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/servicios/validadores.service';

class MockFormGroupFactoryService extends FormGroupFactoryService {
  toFormGroup() {
    const fieldControl = { campo1: new FormControl('', Validators.required) };
    return new FormGroup(fieldControl);
  }
}

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let testFormGroupFactory: FormGroupFactoryService;
  let mockFormGroupFactory: FormGroupFactoryService;
  let mockComponent: FormularioComponent;

  let modeloRender: any;
  beforeAll(() => {
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
    const servicioValidaciones = new ValidadoresService();
    testFormGroupFactory = new FormGroupFactoryService(servicioValidaciones);
    component = new FormularioComponent(testFormGroupFactory);
    mockFormGroupFactory = new MockFormGroupFactoryService(servicioValidaciones);
    mockComponent = new FormularioComponent(mockFormGroupFactory);
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
  it('se puede renderizar un elemento unico (campo basico)', () => {
    component.render([
      {
        name: 'campo1',
        tipoElemento: 'campoBasico',
        texto: 'holamundo campobasico',
        validaciones: [
          { tipoValidacion: 'required' },
          { tipoValidacion: 'email' }
        ]
      }
    ]);
    expect(component.form).toBeTruthy();
    expect(component.form.get('campo1') instanceof FormControl).toBeTruthy();
    expect(component.elementosFormulario).toBeTruthy();
    expect(component.elementosFormulario.length).toEqual(1);
  });

  it('se puede renderizar un elemento co sub elementos (collapsable)', () => {
    component.render([
      {
        name: 'miCollapsable',
        tipoElemento: 'collapsable',
        texto: 'holamundo collapsable',
        elementosGrupo: [
          {
            name: 'campo1Colapsable',
            tipoElemento: 'campoBasico',
            texto: 'holamundo campoBasico collapsable'
          },
          {
            name: 'area1Collapsable',
            tipoElemento: 'areaTexto',
            texto: 'holamundo AreaTexto collapsable'
          }
        ]
      }
    ]);
    expect(component.form).toBeTruthy();
    expect(component.form.get('campo1Colapsable') instanceof FormControl).toBeTruthy();
    expect(component.elementosFormulario).toBeTruthy();
    console.log(component.elementosFormulario[0].inputs.dataElemento);
    expect(component.elementosFormulario.length).toEqual(1);
    expect(component.elementosFormulario[0].inputs.dataElemento.elementosGrupo.length).toEqual(2);
  });
});
