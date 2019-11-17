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
  MatListModule
} from '@angular/material';

const MATERIALMODULES = [
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule
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
