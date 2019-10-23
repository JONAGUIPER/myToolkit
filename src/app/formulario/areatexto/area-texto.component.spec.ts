import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTextoComponent } from './area-texto.component';
import { ElementoFormularioComponent } from '../elemento-formulario/elemento-formulario.component';
import { inject, Injector, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material';

describe('AreaTextoComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: `kc-host-component`,
    template: `<area-texto></area-texto>`
  })
  class TestHostComponent {
    //@ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer: ViewContainerRef;
    @ViewChild('AreaTextoComponent', { read: ViewContainerRef, static: true })
    public AreaTextoComponent: AreaTextoComponent;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaTextoComponent, TestHostComponent],
      //imports: [MatFormFieldModule]
    })
      .compileComponents();
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(AreaTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/
  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  /*it('should create', async(inject( Injector, (injector: Injector) => {
    fixture = TestBed.createComponent(AreaTextoComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  })));*/
  it('should show TEST INPUT', () => {
    let nombreCampo = 'areaTest';
    let formulario = new FormGroup({ ['areaTest']: new FormControl('', []) });
    expect(testHostComponent).toBeTruthy();
    debugger;
    testHostComponent.AreaTextoComponent.name = nombreCampo;
    testHostComponent.AreaTextoComponent.texto = 'labe de area de texto';
    testHostComponent.AreaTextoComponent.form = formulario;

    testHostFixture.detectChanges();
    //expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual('TEST INPUT');
  });



});
