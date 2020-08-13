import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldCardComponent } from './field-card/field-card.component';
import { NoimagePipe } from '../pipes/noimage.pipe';



@NgModule({
  declarations: [
    FieldCardComponent,
    NoimagePipe
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[
    FieldCardComponent
  ]
})
export class ComponentsModule { }
