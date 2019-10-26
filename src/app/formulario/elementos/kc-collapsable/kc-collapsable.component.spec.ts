import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KcCollapsableComponent } from './kc-collapsable.component';
import { Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule, MatIconModule } from '@angular/material';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CollapsableComponent', () => {
  let component: KcCollapsableComponent;
  let fixture: ComponentFixture<KcCollapsableComponent>;
  let testInjector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KcCollapsableComponent,DynamicComponent],
      imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule, MatIconModule,BrowserAnimationsModule
      ],
      providers: [Injector]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KcCollapsableComponent);
    component = fixture.componentInstance;
    testInjector = TestBed.get(Injector);
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
