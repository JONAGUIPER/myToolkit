import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoBasicoComponent } from './campo-basico.component';

describe('CampoBasicoComponent', () => {
  let component: CampoBasicoComponent;
  let fixture: ComponentFixture<CampoBasicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoBasicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoBasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
