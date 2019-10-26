import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcComboComponent } from './kc-combo.component';

describe('KcComboComponent', () => {
  let component: KcComboComponent;
  let fixture: ComponentFixture<KcComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
