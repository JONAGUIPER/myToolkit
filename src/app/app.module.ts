import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// mis componentes
import { CampoBasicoComponent } from './formulario/campo-basico/campo-basico.component';
import { ElementoFormularioComponent } from './formulario/elemento-formulario/elemento-formulario.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { DynamicComponent } from './formulario/dynamic/dynamic.component';
import { AreaTextoComponent } from './formulario/areatexto/area-texto.component';
import { CollapsableComponent } from './formulario/collapsable/collapsable.component';

//MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';


const ENTRYCOMPONENTS = [
  AreaTextoComponent,
  CampoBasicoComponent,
  CollapsableComponent
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
    //ServiceWorkerModule,
    ENTRYCOMPONENTS,
    CollapsableComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MATERIALMODULES,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ENTRYCOMPONENTS]
})
export class AppModule { }
