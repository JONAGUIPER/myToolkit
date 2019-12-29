import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoFormularioComponent } from './elemento-formulario.component';

xdescribe('ElementoFormularioComponent', () => {
  let component: ElementoFormularioComponent;
  let fixture: ComponentFixture<ElementoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
