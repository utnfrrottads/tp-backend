import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { NoimagePipe } from './noimage.pipe';
import { TranslatePipe } from './translate.pipe';



@NgModule({
  declarations: [
    ImagePipe,
    NoimagePipe,
    TranslatePipe
],
  imports: [
    CommonModule
  ],
  exports:[
    ImagePipe,
    NoimagePipe,
    TranslatePipe
  ]
})
export class PipesModule { }
