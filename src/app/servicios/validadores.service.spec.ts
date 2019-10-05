import { TestBed } from '@angular/core/testing';

import { ValidadoresService } from './validadores.service';
import { Validacion } from '../modelos/validacion';
import { Validators } from '@angular/forms';

describe('ValidadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    expect(service).toBeTruthy();
  });

  it('deberia ser Validator.required', () => {
    let options = { tipoValidacion: 'required', parametros: ['param1'] };
    const validacion = new Validacion(options);
    let listaValidaciones: Validacion[] = [];
    listaValidaciones.push(validacion);
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    let listaValidatorFn = service.crearValidaciones(listaValidaciones);
    expect(listaValidatorFn.length).toBeGreaterThan(0);
    expect(listaValidatorFn[0]).toBe(Validators.required);
  });

  it('deberia crear lista 2 elementos', () => {
    let listaValidaciones: Validacion[] = [];
    let options = { tipoValidacion: 'required', parametros: ['param1'] };
    const validacion = new Validacion(options);
    const validacion2 = new Validacion({ tipoValidacion: 'email', parametros: ['param2'] });
    listaValidaciones.push(validacion);
    listaValidaciones.push(validacion2);
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    let listaValidatorFn = service.crearValidaciones(listaValidaciones);
    expect(listaValidatorFn.length).toBeGreaterThan(1);
    expect(listaValidatorFn[0]).toBe(Validators.required);
    expect(listaValidatorFn[1]).toBe(Validators.email);
  });
});
