import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,
  ],
  exports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,

  ]
})
export class MaterialModule { }
