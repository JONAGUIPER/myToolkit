import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// mis componentes
import { KcCampoBasicoComponent } from './kc-json-to-form/formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { KcAreaTextoComponent } from './kc-json-to-form/formulario/elementos/kc-areatexto/kc-area-texto.component';
import { KcCollapsableComponent } from './kc-json-to-form/formulario/elementos/kc-collapsable/kc-collapsable.component';
import { KcComboComponent } from './kc-json-to-form/formulario/elementos/kc-combo/kc-combo.component';
import { KcRadioComponent } from './kc-json-to-form/formulario/elementos/kc-radio/kc-radio.component';
import { KcCheckboxComponent } from './kc-json-to-form/formulario/elementos/kc-checkbox/kc-checkbox.component';
import { KcJsonToFormModule } from './kc-json-to-form/kc-json-to-form-module';

// MATERIAL
import { MaterialModule } from './material/material.module';
import { KcSideBarComponent } from './kc-side-bar/kc-side-bar.component';
import { FormularioDemoComponent } from './formulario-demo/formulario-demo.component';

const ENTRYCOMPONENTS = [
  KcCampoBasicoComponent,
  KcAreaTextoComponent,
  KcCollapsableComponent,
  KcComboComponent,
  KcRadioComponent,
  KcCheckboxComponent
];

@NgModule({
  declarations: [
    AppComponent,
    KcSideBarComponent,
    FormularioDemoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    KcJsonToFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONENTS]
})
export class AppModule { }
