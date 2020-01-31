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
  MatRadioModule
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
  MatRadioModule
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
