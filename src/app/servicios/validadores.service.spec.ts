import { TestBed } from '@angular/core/testing';

import { ValidadoresService } from './validadores.service';
import { Validacion } from '../modelos/validacion';
import { Validators, ValidatorFn, FormControl } from '@angular/forms';
import { CondicionalesService } from './condicionales.service';

describe('ValidadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    expect(service).toBeTruthy();
  });
  it('podria ser un null el parametro', () => {
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    const listaValidatorFn = service.crearValidaciones(null);
    expect(listaValidatorFn).toBeTruthy();
    expect(listaValidatorFn.length).toEqual(0);
  });

  it('podria ser Validator.email', () => {
    const options = { tipoValidacion: 'email', parametros: ['param1'] };
    const validacion: Validacion = options;
    const listaValidaciones: Validacion[] = [];
    listaValidaciones.push(validacion);
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    const listaValidatorFn = service.crearValidaciones(listaValidaciones);
    expect(listaValidatorFn.length).toBeGreaterThan(0);
    expect(listaValidatorFn[0]).toBeDefined();
  });

  it('podria crear lista 2 elementos', () => {
    const listaValidaciones: Validacion[] = [];
    const validacion: Validacion = { tipoValidacion: 'required', parametros: ['param1'] };
    const validacion2: Validacion = { tipoValidacion: 'email', parametros: ['param2'] };
    listaValidaciones.push(validacion);
    listaValidaciones.push(validacion2);
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    const listaValidatorFn = service.crearValidaciones(listaValidaciones);
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
    const listaValidaciones = service.crearListaValidacionesFromJson(listajson);
    expect(listaValidaciones).toBeTruthy();
    expect(listaValidaciones.length).toEqual(3);
    expect(listaValidaciones[1].tipoValidacion).toBe('email');
    expect(listaValidaciones[0].tipoValidacion).toBe('required');
  });
});

fdescribe('Test de validacion requerido', () => {
  let servicioValidacion: ValidadoresService;
  let servicioCondiciones: CondicionalesService;
  let formControl: FormControl;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicioValidacion = TestBed.get(ValidadoresService);
    formControl = new FormControl('input');
    servicioCondiciones = TestBed.get(CondicionalesService);
  });

  it('podria ser un campo requerido invalido, sin Condiciones', () => {
    const validarRequerido: ValidatorFn = servicioValidacion.kcRequiredValidator(null);
    formControl.setValue('');
    formControl.markAsTouched({ onlySelf: true });
    const respuestaValidacion = validarRequerido(formControl);
    expect(respuestaValidacion).toBeTruthy();
    expect(respuestaValidacion.kcRequiredValidator.mensaje).toBeDefined();
  });
  it('podria ser un campo requerido valido, sin Condiciones', () => {
    const validarRequerido: ValidatorFn = servicioValidacion.kcRequiredValidator(null);
    expect(validarRequerido(formControl)).toBeNull();
  });

  it('podria ser un campo requerido valido, con Condiciones a true', () => {
    spyOn(servicioCondiciones, 'evaluar').and.returnValue(true);
    const validarRequerido: ValidatorFn = servicioValidacion.kcRequiredValidator(null);
    expect(validarRequerido(formControl)).toBeNull();
  });
  it('podria ser un campo requerido invalido, con Condiciones a true', () => {
    spyOn(servicioCondiciones, 'evaluar').and.returnValue(true);
    const validarRequerido: ValidatorFn = servicioValidacion.kcRequiredValidator(null);
    formControl.setValue('');
    formControl.markAsTouched({ onlySelf: true });
    const respuestaValidacion = validarRequerido(formControl);
    expect(respuestaValidacion).toBeTruthy();
    expect(respuestaValidacion.kcRequiredValidator.mensaje).toBeDefined();
  });

  it('podria ser un campo requerido invalido, con Condiciones a false lo que lo no debe ser evaluado', () => {
    spyOn(servicioCondiciones, 'evaluar').and.returnValue(false);
    const validarRequerido: ValidatorFn = servicioValidacion.kcRequiredValidator(null);
    formControl.setValue('');
    formControl.markAsTouched({ onlySelf: true });
    const respuestaValidacion = validarRequerido(formControl);
    expect(respuestaValidacion).toBeNull();
  });
});


describe('Test de validacion de Email', () => {
  let servicioValidacion: ValidadoresService;
  let formControl: FormControl;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicioValidacion = TestBed.get(ValidadoresService);
    formControl = new FormControl('input');
  });

  it('podria ser un Email invalido correo con ñ, sin Condiciones', () => {
    const validarEmail: ValidatorFn = servicioValidacion.kcEmailValidator(null);
    formControl.setValue('correoconÑ@invalido.si');
    formControl.markAsDirty({ onlySelf: true });
    formControl.markAsTouched({ onlySelf: true });
    const respuestaValidacion = validarEmail(formControl);
    expect(respuestaValidacion).toBeTruthy();
    expect(respuestaValidacion.kcEmailValidator.mensaje).toBeDefined();
  });
  it('podria ser un Email valido campo vacio, sin Condiciones', () => {
    const validarEmail: ValidatorFn = servicioValidacion.kcEmailValidator(null);
    formControl.setValue('');
    expect(validarEmail(formControl)).toBeNull();
  });
  it('podria ser un Email valido, sin Condiciones', () => {
    const validarEmail: ValidatorFn = servicioValidacion.kcEmailValidator(null);
    formControl.setValue('correo@valido.si');
    formControl.markAsTouched({ onlySelf: true });
    expect(validarEmail(formControl)).toBeNull();
  });
});