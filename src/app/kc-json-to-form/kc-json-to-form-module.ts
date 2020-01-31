import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KcCampoBasicoComponent } from './formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { KcAreaTextoComponent } from './formulario/elementos/kc-areatexto/kc-area-texto.component';
import { KcCollapsableComponent } from './formulario/elementos/kc-collapsable/kc-collapsable.component';
import { KcComboComponent } from './formulario/elementos/kc-combo/kc-combo.component';
import { KcFormularioComponent } from './formulario/kc-formulario/kc-formulario.component';
import { KcRadioComponent } from './formulario/elementos/kc-radio/kc-radio.component';
import { DynamicComponent } from './formulario/dynamic/dynamic.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { ValidadoresService } from './servicios/validadores.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogServices } from './Interceptors/error-interceptor';



const ENTRYCOMPONENTS = [
  KcCampoBasicoComponent,
  KcAreaTextoComponent,
  KcCollapsableComponent,
  KcComboComponent,
  KcRadioComponent
];

@NgModule({
  declarations: [
    KcFormularioComponent,
    DynamicComponent,
    ENTRYCOMPONENTS,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    KcFormularioComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: LogServices,
      multi: true
    }
  ],
  entryComponents: [ENTRYCOMPONENTS]
})
export class KcJsonToFormModule { }
