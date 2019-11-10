import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { KcSideBarComponent } from './kc-side-bar/kc-side-bar.component';


const routes: Routes = [
  // { path: '', component: FormularioComponent },
  { path: '', component: KcSideBarComponent },
  { path: 'sidebar', component: KcSideBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
