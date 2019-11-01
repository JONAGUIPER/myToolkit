import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// mis componentes

import { ElementoFormularioComponent } from './formulario/elemento-formulario/elemento-formulario.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { DynamicComponent } from './formulario/dynamic/dynamic.component';
import { KcCampoBasicoComponent } from './formulario/elementos/kc-campo-basico/kc-campo-basico.component';
import { KcAreaTextoComponent } from './formulario/elementos/kc-areatexto/kc-area-texto.component';
import { KcCollapsableComponent } from './formulario/elementos/kc-collapsable/kc-collapsable.component';

//MATERIAL
import {
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule
} from '@angular/material';
import { ValidadoresService } from './servicios/validadores.service';
import { KcComboComponent } from './formulario/elementos/kc-combo/kc-combo.component';



const ENTRYCOMPONENTS = [
  KcCampoBasicoComponent,
  KcAreaTextoComponent,
  KcCollapsableComponent
];

const MATERIALMODULES = [
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    ElementoFormularioComponent,
    FormularioComponent,
    DynamicComponent,
    ENTRYCOMPONENTS,
    KcComboComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MATERIALMODULES,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ValidadoresService],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONENTS]
})
export class AppModule { }
