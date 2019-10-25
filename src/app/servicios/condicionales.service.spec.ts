import { TestBed } from '@angular/core/testing';

import { CondicionalesService } from './condicionales.service';
import { Condicion } from '../modelos/condicion';
import { FormControl, FormGroup } from '@angular/forms';
import { FormularioComponent } from '../formulario/formulario/formulario.component';
import { CondicionesEnum } from '../enumeradores/condiciones-enum.enum';
import { Condiciones } from '../modelos/condiciones';

describe('CondicionalesService', () => {
  let service: CondicionalesService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CondicionalesService);

  });

  it('se puede instaciar el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('se puede validar una condicion entre valores fijos ', () => {
    const fieldEvaluado = new FormControl('6');
    let condicion: Condicion = { valorFijo: '5', condicion: 'mayor' };
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();
    condicion = { valorFijo: '5', condicion: 'mayorigual' };
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();
    condicion = { valorFijo: '9', condicion: 'menor' };
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();
    condicion = { valorFijo: 6, condicion: 'menorigual' };
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();
    condicion = { valorFijo: 6, condicion: 'igual' };
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();
    condicion = { valorFijo: 5, condicion: 'distinto' };
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();
  });

  it('se puede validar una condicion entre valores campos de formulario', () => {
    const fieldEvaluado = new FormControl('7');
    const formulario = new FormGroup({ ['campoEvaluador']: new FormControl('5') });
    service.formulario = formulario;
    const condicion: Condicion = { nombreCampo: 'campoEvaluador', condicion: 'mayor' };
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();

    condicion.condicion = 'mayorigual';
    formulario.get('campoEvaluador').setValue(5);
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();

    condicion.condicion = 'menor';
    formulario.get('campoEvaluador').setValue(8);
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();

    condicion.condicion = 'menorigual';
    formulario.get('campoEvaluador').setValue(10);
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();

    condicion.condicion = 'igual';
    formulario.get('campoEvaluador').setValue(7);
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();

    condicion.condicion = 'distinto';
    formulario.get('campoEvaluador').setValue(5);
    expect(service.evaluarCondicionSimple(fieldEvaluado, condicion)).toBeTruthy();
  });

  it('se pueden validar lista de condiciones con AND', () => {
    const condicionesJSON = JSON.parse(`{
      "operadorLogico":"AND",
      "condiciones":[
        {
          "condicion": "mayor",
          "valorFijo": "5"
        },
        {
          "condicion": "menor",
          "valorFijo": "10"
        }
      ]
    }`);
    const condiciones: Condiciones = condicionesJSON;
    const fieldEvaluado = new FormControl('7');
    expect(service.evaluar(fieldEvaluado, condiciones)).toBeTruthy();
    fieldEvaluado.setValue(15);
    expect(service.evaluar(fieldEvaluado, condiciones)).toBeFalsy();
  });

  it('se pueden validar lista de condiciones con OR', () => {
    const condicionesJSON = JSON.parse(`{
      "operadorLogico":"OR",
      "condiciones":[
        {
          "condicion": "mayor",
          "valorFijo": "5"
        },
        {
          "condicion": "menor",
          "valorFijo": "10"
        }
      ]
    }`);
    const condiciones: Condiciones = condicionesJSON;
    const fieldEvaluado = new FormControl('7');
    expect(service.evaluar(fieldEvaluado, condiciones)).toBeTruthy();
    fieldEvaluado.setValue(15);
    expect(service.evaluar(fieldEvaluado, condiciones)).toBeTruthy();
  });

  it('se pueden validar lista de operadores Logicos con AND y OR', () => {
    const condicionesJSON = JSON.parse(`{
      "operadorLogico":"OR",
      "subCondiciones":[
        {
          "operadorLogico":"AND",
          "condiciones":[
            {
              "condicion": "mayor",
              "valorFijo": "5"
            },
            {
              "condicion": "menor",
              "valorFijo": "10"
            }
          ]
        },
        {
          "operadorLogico":"AND",
          "condiciones":[
            {
              "condicion": "mayor",
              "valorFijo": "15"
            },
            {
              "condicion": "menor",
              "valorFijo": "20"
            }
          ]
        }
      ]
    }`);
    const condiciones: Condiciones = condicionesJSON;
    const fieldEvaluado = new FormControl('7');
    expect(service.evaluar(fieldEvaluado, condiciones)).toBeTruthy();
    fieldEvaluado.setValue(12);
    expect(service.evaluar(fieldEvaluado, condiciones)).toBeFalsy();
    fieldEvaluado.setValue(17);
    expect(service.evaluar(fieldEvaluado, condiciones)).toBeTruthy();
  });

});
