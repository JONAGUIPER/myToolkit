import { ElementoFormularioModel } from './elemento-formulario-model';
import { CampoBasicoComponent } from '../formulario/campo-basico/campo-basico.component';
import { ValidadoresService } from '../servicios/validadores.service';

describe('ElementoFormularioModel', () => {
  'use strict';
  let modeloRender;
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

  it('should create an instance', () => {
    expect(new ElementoFormularioModel(new ValidadoresService())).toBeTruthy();
  });

  it('contruye un campo basico', () => {
    let campoBasico = new ElementoFormularioModel(new ValidadoresService());
    campoBasico.build(modeloRender.elementosFormulario[0]);
    expect(campoBasico.component).toBe(CampoBasicoComponent);
    expect(campoBasico.inputs).toBeTruthy();
    expect(campoBasico.inputs.name).toEqual('campo1');
    expect(campoBasico.inputs.texto).toEqual('holamundo campobasico');
  });

});
