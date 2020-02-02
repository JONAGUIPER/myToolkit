import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule

} from '@angular/material';

const MATERIALMODULES = [
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatRadioModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIALMODULES,
  ],
  exports: [
    MATERIALMODULES,
  ]
})
export class MaterialModule { }
