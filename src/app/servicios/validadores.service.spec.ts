import { TestBed } from '@angular/core/testing';

import { ValidadoresService } from './validadores.service';
import { Validacion } from '../modelos/validacion';
import { Validators, ValidatorFn, FormControl } from '@angular/forms';

describe('ValidadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    expect(service).toBeTruthy();
  });
  it('podria ser un null el parametro', () => {
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    let listaValidatorFn = service.crearValidaciones(null);
    expect(listaValidatorFn).toBeTruthy();
    expect(listaValidatorFn.length).toEqual(0);
  });

  it('podria ser Validator.email', () => {
    let options = { tipoValidacion: 'email', parametros: ['param1'] };
    const validacion: Validacion = options;
    let listaValidaciones: Validacion[] = [];
    listaValidaciones.push(validacion);
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    let listaValidatorFn = service.crearValidaciones(listaValidaciones);
    expect(listaValidatorFn.length).toBeGreaterThan(0);
    expect(listaValidatorFn[0]).toBeDefined();
  });

  it('podria crear lista 2 elementos', () => {
    let listaValidaciones: Validacion[] = [];
    const validacion: Validacion = { tipoValidacion: 'required', parametros: ['param1'] };
    const validacion2: Validacion = { tipoValidacion: 'email', parametros: ['param2'] };
    listaValidaciones.push(validacion);
    listaValidaciones.push(validacion2);
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    let listaValidatorFn = service.crearValidaciones(listaValidaciones);
    debugger;
    expect(listaValidatorFn.length).toBeGreaterThan(1);
    expect(listaValidatorFn[0]).toBeTruthy();
    expect(listaValidatorFn[1]).toBeTruthy();
  });

  it('podria crear lista de validaciones desde Json', () => {
    const listajson = {
      validaciones: [
        { tipoValidacion: 'required', parametros: ['param1'] },
        { tipoValidacion: 'email', parametros: ['param2'] },
        { tipoValidacion: 'required', parametros: ['param2'] }
      ]
    };
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    let listaValidaciones = service.crearListaValidacionesFromJson(listajson);
    expect(listaValidaciones).toBeTruthy();
    expect(listaValidaciones.length).toEqual(3);
    expect(listaValidaciones[1].tipoValidacion).toBe('email');
    expect(listaValidaciones[0].tipoValidacion).toBe('required');
  });


});


describe('Test Funciones de validacion', () => {
  let servicioValidacion: ValidadoresService;
  let formControl: FormControl;
  beforeEach(() => {
    TestBed.configureTestingModule({})
    servicioValidacion = TestBed.get(ValidadoresService);
    formControl = new FormControl('input');
  });

  it('podria ser un campo requerido invalido', () => {
    const validarRequerido: ValidatorFn = servicioValidacion.kcRequiredValidator();
    formControl.setValue('');
    formControl.markAsTouched({ onlySelf: true });
    const respuestaValidacion = validarRequerido(formControl);
    expect(respuestaValidacion).toBeTruthy();
    expect(respuestaValidacion.kcRequiredValidator.mensaje).toBeDefined();
  });
  it('podria ser un campo requerido valido', () => {
    const validarRequerido: ValidatorFn = servicioValidacion.kcRequiredValidator();
    expect(validarRequerido(formControl)).toBeNull();
  });
  it('podria ser un Email invalido correo con ñ', () => {
    const validarEmail: ValidatorFn = servicioValidacion.kcEmailValidator();
    formControl.setValue('correoconÑ@invalido.si');
    formControl.markAsDirty({ onlySelf: true });
    formControl.markAsTouched({ onlySelf: true });
    const respuestaValidacion = validarEmail(formControl);
    expect(respuestaValidacion).toBeTruthy();
    expect(respuestaValidacion.kcEmailValidator.mensaje).toBeDefined();
  });
  it('podria ser un Email valido campo vacio', () => {
    const validarEmail: ValidatorFn = servicioValidacion.kcEmailValidator();
    formControl.setValue('');
    expect(validarEmail(formControl)).toBeNull();
  });
  it('podria ser un Email valido', () => {
    const validarEmail: ValidatorFn = servicioValidacion.kcEmailValidator();
    formControl.setValue('correo@valido.si');
    formControl.markAsTouched({ onlySelf: true });
    expect(validarEmail(formControl)).toBeNull();
  });
});
