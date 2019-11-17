import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KcFormularioComponent } from './kc-json-to-form/formulario/kc-formulario/kc-formulario.component';
import { KcSideBarComponent } from './kc-side-bar/kc-side-bar.component';
import { FormularioDemoComponent } from './formulario-demo/formulario-demo.component';


const routes: Routes = [
  { path: '', component: KcFormularioComponent },
  { path: 'testing', component: KcFormularioComponent },
  { path: 'demo', component: FormularioDemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
