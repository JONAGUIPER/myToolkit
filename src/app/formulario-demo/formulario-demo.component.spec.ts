import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDemoComponent } from './formulario-demo.component';

xdescribe('FormularioDemoComponent', () => {
  let component: FormularioDemoComponent;
  let fixture: ComponentFixture<FormularioDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
