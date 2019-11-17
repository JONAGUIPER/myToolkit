import { TestBed } from '@angular/core/testing';

import { FormGroupFactoryService } from './form-group-factory.service';
import { ElementoFormularioDto } from '../modelos/elemento-formulario-dto';
import { FormGroup } from '@angular/forms';

describe('FormGroupFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('se puede crear una instancia', () => {
    const service: FormGroupFactoryService = TestBed.get(FormGroupFactoryService);
    expect(service).toBeTruthy();
  });

  it('se crea un form group desde un unico campo sin validaciones', () => {
    const service: FormGroupFactoryService = TestBed.get(FormGroupFactoryService);
    const elementosDto: ElementoFormularioDto[] = [];
    const elementoDto = new ElementoFormularioDto({
      name: 'campo1',
      tipoElemento: 'campoBasico',
      texto: 'holamundo campobasico',
    });
    elementosDto.push(elementoDto);
    const form = service.toFormGroup(elementosDto);
    expect(form).toBeTruthy();
    expect(form instanceof FormGroup).toBeTruthy();
    expect(form.contains('campo1')).toBeTruthy();
  });
  it('se crea un form group desde un unico campo con validaciones', () => {
    const service: FormGroupFactoryService = TestBed.get(FormGroupFactoryService);
    const elementosDto: ElementoFormularioDto[] = [];
    const elementoDto = new ElementoFormularioDto({
      name: 'campo1',
      tipoElemento: 'campoBasico',
      texto: 'holamundo campobasico',
      validaciones: [
        {'tipoValidacion':'required'},
        {'tipoValidacion':'email'}
      ]
    });
    elementosDto.push(elementoDto);
    const form = service.toFormGroup(elementosDto);
    expect(form).toBeTruthy();
    expect(form instanceof FormGroup).toBeTruthy();
    expect(form.contains('campo1')).toBeTruthy();
    console.log(form.get('campo1').validator.length);
    expect(form.get('campo1').validator).toBeTruthy();
  });
  it('se crea un form group desde 2 campos en un collapsable sin validaciones', () => {
    const service: FormGroupFactoryService = TestBed.get(FormGroupFactoryService);
    const elementosDto: ElementoFormularioDto[] = [];
    const elementoDto = new ElementoFormularioDto({
      name: 'mi form collapsable',
      tipoElemento: 'collapsable',
      texto: 'holamundo collapsable',
      elementosGrupo: [
        new ElementoFormularioDto({
          name: 'campo1Colapsable',
          tipoElemento: 'campoBasico',
          texto: 'holamundo campoBasico collapsable'
        }),
        new ElementoFormularioDto({
          name: 'area1Collapsable',
          tipoElemento: 'areaTexto',
          texto: 'holamundo AreaTexto collapsable'
        })
      ]
    });
    elementosDto.push(elementoDto);
    const form = service.toFormGroup(elementosDto);
    expect(form).toBeTruthy();
    expect(form instanceof FormGroup).toBeTruthy();
    expect(form.contains('campo1Colapsable')).toBeTruthy();
    expect(form.get('campo1Colapsable').validator).toBeNull();
  });
});
