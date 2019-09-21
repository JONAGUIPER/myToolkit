import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampoBasicoComponent } from './formulario/campo-basico/campo-basico.component';
import { ElementoFormularioComponent } from './formulario/elemento-formulario/elemento-formulario.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    CampoBasicoComponent,
    ElementoFormularioComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
