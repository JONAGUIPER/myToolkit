import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcCampoBasicoComponent } from './kc-campo-basico.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { Injector, DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataElementoFormularioModel } from 'src/app/modelos/data-elemento-formulario-model';
import { By } from '@angular/platform-browser';
import { Validacion } from 'src/app/modelos/validacion';
import { ValidadoresService } from 'src/app/servicios/validadores.service';

fdescribe('KcCampoBasicoComponent', () => {
  let component: KcCampoBasicoComponent;
  let fixture: ComponentFixture<KcCampoBasicoComponent>;
  let testInjector: Injector;
  let testValidator: ValidadoresService;
  let componenteHtml: DebugElement;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [KcCampoBasicoComponent],
      imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [Injector, ValidadoresService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(KcCampoBasicoComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    testInjector = TestBed.get(Injector);
    testValidator = TestBed.get(ValidadoresService);
  });

  it('el elemento se crea con todas las propiedades correctamente', () => {
    const dataElemento = new DataElementoFormularioModel({
      name: 'inputTest',
      texto: 'label del elemento',
      value: 'valor por Defecto'
    });
    const formulario = new FormGroup({ [dataElemento.name]: new FormControl(dataElemento.value, []) });
    spyOn(testInjector, 'get').and.callFake((token) => {
      switch (token) {
        case 'texto':
          return dataElemento.texto;
        case 'formulario':
          return formulario;
        case 'name':
          return dataElemento.name;
        case 'value':
          return dataElemento.value;
        case 'elementosGrupo':
          return null;
      }
    });
    fixture.detectChanges();
    componenteHtml = fixture.debugElement.query(By.css('.mat-form-field'));
    const input = componenteHtml.query(By.css('#' + dataElemento.name));
    const label = componenteHtml.query(By.css('label'));
    expect(component).toBeTruthy();
    expect(input).toBeTruthy();
    expect(input.nativeElement.value).toEqual(dataElemento.value);
    expect(label).toBeTruthy();
    expect(label.nativeElement.innerText).toEqual(dataElemento.texto);

  });

  it('el elemento muestra errores cuando es un campo invalido', () => {
    const validaObligatorio: Validacion[] = [{ tipoValidacion: 'required' }];
    const dataElemento = new DataElementoFormularioModel({
      name: 'inputTest',
      texto: 'label del elemento',
      value: '',
      validaciones: validaObligatorio
    });
    const formulario = new FormGroup({
      [dataElemento.name]: new FormControl(
        dataElemento.value,
        testValidator.crearValidaciones(dataElemento.validaciones)
      )
    });
    spyOn(testInjector, 'get').and.callFake((token: any) => {
      switch (token) {
        case 'texto':
          return dataElemento.texto;
        case 'formulario':
          return formulario;
        case 'name':
          return dataElemento.name;
        case 'value':
          return dataElemento.value;
        case 'elementosGrupo':
          return null;
      }
    });

    fixture.detectChanges();
    formulario.get(dataElemento.name).setValue('');
    formulario.get(dataElemento.name).markAsDirty({ onlySelf: true });
    formulario.get(dataElemento.name).markAsTouched({ onlySelf: true });
    fixture.detectChanges();
    componenteHtml = fixture.debugElement.query(By.css('.mat-form-field'));
    const tagError = componenteHtml.query(By.css('.mat-error'));
    expect(tagError).toBeTruthy();
    expect(tagError.nativeElement.innerText).not.toEqual('');

  });

  it('el elemento no muestra errores cuando es valido', () => {
    const validaObligatorio: Validacion[] = [{ tipoValidacion: 'required' }];
    const dataElemento = new DataElementoFormularioModel({
      name: 'inputTest',
      texto: 'label del elemento',
      value: '',
      validaciones: validaObligatorio
    });
    const formulario = new FormGroup({
      [dataElemento.name]: new FormControl(
        dataElemento.value,
        testValidator.crearValidaciones(dataElemento.validaciones)
      )
    });
    spyOn(testInjector, 'get').and.callFake((token: any) => {
      switch (token) {
        case 'texto':
          return dataElemento.texto;
        case 'formulario':
          return formulario;
        case 'name':
          return dataElemento.name;
        case 'value':
          return dataElemento.value;
        case 'elementosGrupo':
          return null;
      }
    });

    fixture.detectChanges();
    formulario.get(dataElemento.name).setValue('jojo');
    formulario.get(dataElemento.name).markAsDirty({ onlySelf: true });
    formulario.get(dataElemento.name).markAsTouched({ onlySelf: true });
    fixture.detectChanges();
    componenteHtml = fixture.debugElement.query(By.css('.mat-form-field'));
    const tagError = componenteHtml.query(By.css('.mat-error'));
    expect(tagError).toBeNull();

  });
});
