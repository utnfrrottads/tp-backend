import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CamaService } from '../services/cama-service.service';
import { Bed } from '../models/bed';
import { MatTableDataSource } from '@angular/material/table';
import { InputType } from '../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-cama',
  templateUrl: './cama.component.html',
  styleUrls: ['./cama.component.sass']
})
export class CamaComponent implements OnInit {
  // @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataBed : Bed[];  
  //dataSource = new MatTableDataSource(this.dataCama); 
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

  ngOnInit(): void {
    this.loadCamas();
  } 
  loadCamas(){
    console.log('LOAD CAMA');
    this.camaService.getCamas().subscribe({
      next: res =>{
        console.log('res', res);
        console.log('res.camas', res.camas); 
        console.log('res.camas.values', res.camas.values); 
        this.dataBed = res.camas;
      
      },
      error: err =>{
        console.log('error dataCama', err); 
      }
    });
  } 
  setCamaSelected(bed: Bed){
    console.log('se seteó en cama.component');
    this.bedSelected = bed;
    this.inputType = InputType.edit;
    // this.accordion.openAll();
    console.log(this.bedSelected);
  }
  setInputTypeCreate(){
    this.inputType = InputType.create;
    // this.accordion.openAll();
  } 
} 