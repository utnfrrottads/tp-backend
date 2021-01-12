import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CamaService } from '../services/cama-service.service';
import { Bed } from '../models/bed';
import { MatTableDataSource } from '@angular/material/table';
import { InputType } from '../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-cama',
  templateUrl: './cama.component.html'
})
export class CamaComponent {
  public dataBed : Bed[];
  bedSelected : Bed = {
    id: '',
    description: '',
    status: '',
    type: '',
    subtype: '',
    idHospital: '',
    hospitalName: ''
  }; 
  inputType: number = 0;

  constructor(
    private camaService: CamaService
  ) { }

  setCamaSelected(bed: Bed){
    // console.log('se seteó en cama.component');
    this.bedSelected = bed;
    this.inputType = InputType.edit;
  }
  setInputTypeCreate(){
    this.inputType = InputType.create;
  } 
} 