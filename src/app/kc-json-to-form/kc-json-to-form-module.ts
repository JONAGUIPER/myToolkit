import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KcCampoBasicoComponent } from './formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { KcAreaTextoComponent } from './formulario/elementos/kc-areatexto/kc-area-texto.component';
import { KcCollapsableComponent } from './formulario/elementos/kc-collapsable/kc-collapsable.component';
import { KcComboComponent } from './formulario/elementos/kc-combo/kc-combo.component';
import { ElementoFormularioComponent } from './formulario/elemento-formulario/elemento-formulario.component';
import { KcFormularioComponent } from './formulario/kc-formulario/kc-formulario.component';
import { DynamicComponent } from './formulario/dynamic/dynamic.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { ValidadoresService } from './servicios/validadores.service';



const ENTRYCOMPONENTS = [
  KcCampoBasicoComponent,
  KcAreaTextoComponent,
  KcCollapsableComponent,
  KcComboComponent
];

@NgModule({
  declarations: [
    ElementoFormularioComponent,
    KcFormularioComponent,
    DynamicComponent,
    ENTRYCOMPONENTS,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [
    KcFormularioComponent
  ],
  providers: [],
  entryComponents: [ENTRYCOMPONENTS]
})
export class KcJsonToFormModule { }
