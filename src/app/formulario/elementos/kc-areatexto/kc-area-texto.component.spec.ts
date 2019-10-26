import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcAreaTextoComponent } from './kc-area-texto.component';
import { Injector, ViewChild, Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

describe('AreaTextoComponent', () => {


  let component: KcAreaTextoComponent;
  let fixture: ComponentFixture<KcAreaTextoComponent>;
  let testInjector: Injector;

  @Component({
    selector: `kc-host-component`,
    template: `
    <form [formGroup]="form" ><kc-area-texto></kc-area-texto></form >`
  })
  class TestHostComponent {
    //@ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer: ViewContainerRef;
    @ViewChild('AreaTextoComponent', { read: ViewContainerRef, static: true })
    public AreaTextoComponent: KcAreaTextoComponent;
    form: FormGroup;
  }

  beforeEach(/*async(*/() => {
    TestBed.configureTestingModule({
      declarations: [KcAreaTextoComponent, TestHostComponent],
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule],
      providers: [Injector]
    });
    // create component and test fixture
    fixture = TestBed.createComponent(KcAreaTextoComponent);
    // get test component from the fixture
    component = fixture.componentInstance;

    testInjector = TestBed.get(Injector);
  }/*)*/);

  /*beforeEach(() => {
    fixture = TestBed.createComponent(AreaTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });
*/
  /*it('should create', async(inject( Injector, (injector: Injector) => {
    fixture = TestBed.createComponent(AreaTextoComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  })));*/
  /*it('should show TEST INPUT', () => {
    let nombreCampo = 'areaTest';
    let formulario = new FormGroup({ ['areaTest']: new FormControl('', []) });
    expect(testHostComponent).toBeTruthy();
    
    let formBuilder = new FormBuilder();
    testHostComponent.form = formBuilder.group({
      areaTest: null
    });
    testHostComponent.AreaTextoComponent.name = nombreCampo;
    testHostComponent.AreaTextoComponent.texto = 'labe de area de texto';
    testHostComponent.AreaTextoComponent.form = formulario;

    testHostFixture.detectChanges();
    //expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual('TEST INPUT');
  });
*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
