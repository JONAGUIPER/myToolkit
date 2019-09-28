import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampoBasicoComponent } from './formulario/campo-basico/campo-basico.component';
import { ElementoFormularioComponent } from './formulario/elemento-formulario/elemento-formulario.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { DynamicComponent } from './formulario/dynamic/dynamic.component';
import { AreaTextoComponent } from './formulario/areatexto/area-texto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

const ENTRYCOMPONENTS = [
  AreaTextoComponent,
  CampoBasicoComponent
];

const MATERIALMODULES = [
  MatFormFieldModule,
  MatCardModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    ElementoFormularioComponent,
    FormularioComponent,
    DynamicComponent,
    ENTRYCOMPONENTS

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MATERIALMODULES
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONENTS]
})
export class AppModule { }
