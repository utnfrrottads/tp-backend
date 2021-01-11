import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CamaService } from '../../services/cama-service.service';
import { BedType, BedStatus, Bed, BedSubType } from '../../models/bed';
import { InputType } from 'src/app/common/models/typeInputEnum';
import { EfectorService } from 'src/app/efector/services/efector.service';
import { Efector } from 'src/app/efector/model/efector';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cama-form',
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.css']
})
export class CamaFormComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  bedForm: FormGroup;
  dataBedType: BedType[];
  dataBedSubType: BedSubType[];
  dataBedStatus: BedStatus[];
  dataHospital: Efector[];
  @Input() inputType: InputType;
  @Input() bedSelected: Bed =  {
    id: '',
    description: '',
    status: '',
    type: '',
    subtype: '',
    idHospital: '',
    hospitalName: ''
  }; 
  
  constructor(
    private camaService: CamaService, 
    private hospitalService: EfectorService,
    private _snackBar: MatSnackBar
  ) {}

  
  ngOnInit() {
    this.initForm();
    this.loadDropDown();
    this.getHospitals();
  }
  ngOnChanges(){
    this.initForm();
    this.loadCamaSelected();
    this.accordion.openAll();
  }
  initForm(){
    this.bedForm = new FormGroup({
      id: new FormControl({ value: ''}),
      description: new FormControl('', [Validators.required]), 
      status: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      subtype: new FormControl('', [Validators.required]),
      idHospital: new FormControl('', [Validators.required]),
      hospitalName: new FormControl('')
    }); 
  }
  loadDropDown(){
    this.loadTipoCama();
    this.loadSubTipoCama();
    this.loadEstadoCama();
  }
  loadTipoCama(){
    this.camaService.getTipoCama().subscribe({
      next: res => {
      this.dataBedType = res;
      },
    });  
  }
  loadSubTipoCama(){
    this.camaService.getSubTipoCama().subscribe({
      next: res => {
      this.dataBedSubType = res;
      },
    });  
  }
  loadEstadoCama(){
    this.camaService.getEstadoCama().subscribe({
      next: res => {
      this.dataBedStatus = res;
      }, 
    });  
  }
  getHospitals(){
    this.hospitalService.getHospitals().subscribe({
      next: res => {
      this.dataHospital = res.hospitals;
      }, 
    });  
  }
  loadCamaSelected(){
    console.log('load cama selected', this.bedSelected) ;
    if (this.bedSelected.id !== null && this.bedSelected.id !== '') {
      this.bedForm.patchValue({ 
        id: this.bedSelected.id,
        description: this.bedSelected.description, 
        type: this.bedSelected.type,
        subtype: this.bedSelected.subtype,
        status: this.bedSelected.status,
        idHospital: this.bedSelected.idHospital,
        hospitalName: this.bedSelected.hospitalName
      })
    }
  }
  onSubmit(){
    console.log('onSubmit');
    if(this.inputType===InputType.create){
      this.createBed();
    } else if(this.inputType===InputType.edit){
      this.updateBedById();
    }

    // this.bedToDataBase.emit(this.bedForm.value);
  }
  setButtonText(){
    return this.inputType===InputType.edit ? 'Actualizar': 'Agregar';
  }
  onCancel(){
    this.inputType = InputType.cancel;
  }
  createBed(){
    console.log(this.bedForm.value);
    
    this.camaService.createBed(this.bedForm.value).subscribe({
      next: res => {
      //this.data = res; 
       this.accordion.closeAll();  
       this.openSnackBar('Se insertó exitosamente','');
      
      } 

    });
  }
  updateBedById(){

    console.log('updateBedById', this.bedForm.value);
    this.camaService.updateBedById(this.bedForm.value).subscribe({
      next: res => {
      //this.data = res;
      // console.log('resultado de la actualizacion', res); 
       this.accordion.closeAll();  
       this.openSnackBar('Se actualizó exitosamente','');
      },
    });
  }  
  
  // Muestra mensaje pop up
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
    });
  }
}