import { ElementoFormularioDto } from './elemento-formulario-dto';
import { KcCampoBasicoComponent } from '../formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { ValidadoresService } from '../servicios/validadores.service';

describe('ElementoFormularioDto', () => {
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

  it('contruye un campo basico', () => {
    let campoBasico = new ElementoFormularioDto(modeloRender.elementosFormulario[0]);
    expect(campoBasico.component).toBe(KcCampoBasicoComponent);
    expect(campoBasico.inputs).toBeTruthy();
    expect(campoBasico.inputs.dataElemento.name).toEqual('campo1');
    expect(campoBasico.inputs.dataElemento.texto).toEqual('holamundo campobasico');
  });

});
