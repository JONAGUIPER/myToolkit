import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcCampoBasicoComponent } from './kc-campo-basico.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { Injector } from '@angular/core';

describe('CampoBasicoComponent', () => {
  let component: KcCampoBasicoComponent;
  let fixture: ComponentFixture<KcCampoBasicoComponent>;
  let testInjector: Injector;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [KcCampoBasicoComponent],
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule
      ],
      providers: [Injector]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(KcCampoBasicoComponent);
    // get test component from the fixture
    component = fixture.componentInstance;

    testInjector = TestBed.get(Injector);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
