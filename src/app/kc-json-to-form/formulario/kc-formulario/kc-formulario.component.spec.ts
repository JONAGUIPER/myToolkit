import { ComponentFixture } from '@angular/core/testing';

import { KcFormularioComponent } from './kc-formulario.component';
import { FormGroupFactoryService } from 'src/app/kc-json-to-form/servicios/form-group-factory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/kc-json-to-form/servicios/validadores.service';
import { ElementoFormularioDto } from '../../modelos/elemento-formulario-dto';

class MockFormGroupFactoryService extends FormGroupFactoryService {
  toFormGroup() {
    const fieldControl = { campo1: new FormControl('', Validators.required) };
    return new FormGroup(fieldControl);
  }
}

fdescribe('FormularioComponent', () => {
  let component: KcFormularioComponent;
  let testFormGroupFactory: FormGroupFactoryService;
  let mockFormGroupFactory: FormGroupFactoryService;
  let mockComponent: KcFormularioComponent;

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
    component = new KcFormularioComponent(testFormGroupFactory);
    mockFormGroupFactory = new MockFormGroupFactoryService(servicioValidaciones);
    mockComponent = new KcFormularioComponent(mockFormGroupFactory);
  });

  /*afterEach(() => {
    testFormGroupFactory = null;
    component = null;
  });*/


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create con servicio mockeado', () => {
    expect(mockComponent).toBeTruthy();
  });
  it('se puede renderizar un elemento unico (campo basico)', () => {
    const camposJson = `{
    "elementosFormulario": [
      {
        "name": "campo1",
        "tipoElemento": "campoBasico",
        "texto": "holamundo campobasico",
        "obligatorio":true
      }]
    }`;
    modeloRender = JSON.parse(camposJson);
    component.preRender(modeloRender.elementosFormulario);
    expect(component.form).toBeTruthy();
    expect(component.form.get('campo1') instanceof FormControl).toBeTruthy();
    expect(component.elementosFormulario).toBeTruthy();
    expect(component.elementosFormulario.length).toEqual(1);
  });

  it('se puede renderizar un elemento con sub elementos (collapsable)', () => {
    const camposJson = `{
      "elementosFormulario": [
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
    component.preRender(modeloRender.elementosFormulario);
    expect(component.form).toBeTruthy();
    expect(component.form.get('campo1Colapsable') instanceof FormControl).toBeTruthy();
    expect(component.elementosFormulario).toBeTruthy();
    expect(component.elementosFormulario.length).toEqual(1);
    expect(component.elementosFormulario[0].inputs.dataElemento.elementosGrupo.length).toEqual(2);
  });
});
