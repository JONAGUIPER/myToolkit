import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcSideBarComponent } from './kc-side-bar.component';
import { MatSidenavModule, MatListModule, MatIconModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('KcSideBarComponent', () => {
  let component: KcSideBarComponent;
  let fixture: ComponentFixture<KcSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KcSideBarComponent],
      imports: [MatSidenavModule, MatListModule, MatIconModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
