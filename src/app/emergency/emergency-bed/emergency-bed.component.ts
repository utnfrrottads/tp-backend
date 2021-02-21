import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bed } from 'src/app/cama/models/bed';
import { BedService } from 'src/app/cama/services/bed.service';
import { CommonService } from 'src/app/common/services/common.service';
import { Hospital } from 'src/app/hospital/models/hospital';
import { HospitalService } from 'src/app/hospital/services/hospital.service';

@Component({
  selector: 'app-emergency-bed',
  templateUrl: './emergency-bed.component.html'
})
export class EmergencyBedComponent{

  @Output() bedSelected = new EventEmitter();
  @Input() idHospital: Hospital; 
  dataBeds: Bed[];
  flagGetBeds: boolean = false;
  displayedColumns: string[] = ['description', 'status', 'type', 'subtype', 'hospitalName', 'actions'];
 

  constructor(
    private hospitalService: HospitalService, 
    private commonService: CommonService
  ) { } 

  ngOnChanges(): void{
    console.log('ngOnChanges');
    if(this.idHospital){
      this.getAllBedsById(this.idHospital.id);
    }
  } 

  getAllBedsById(idHospital: string): void{
    this.flagGetBeds = true;
    this.hospitalService.getAllBedsById(idHospital).subscribe({
      next: res => {
        console.log('getAllBedsById',res);
        this.dataBeds = res.beds; 
        this.flagGetBeds = false;
    },
    error: err => {
      this.flagGetBeds = false;
      this.commonService.openSnackBar(err.error.msg,'Cerrar');
     } 
    });
  }

  onSelectBed(bed: Bed){ 
    this.bedSelected.emit(bed)
  }
}
