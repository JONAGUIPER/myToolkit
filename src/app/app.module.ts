import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampoBasicoComponent } from './formulario/campo-basico/campo-basico.component';
import { ElementoFormularioComponent } from './formulario/elemento-formulario/elemento-formulario.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { DynamicComponent } from './formulario/dynamic/dynamic.component';
import { AreaTextoComponent } from './formulario/areatexto/area-texto.component';


const ENTRYCOMPONENTS = [
  AreaTextoComponent,
  CampoBasicoComponent
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONENTS]
})
export class AppModule { }
