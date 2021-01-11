import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CamaService } from '../../services/cama-service.service';
import { BedType, BedStatus, Bed, BedSubType } from '../../models/bed';
import { InputType } from 'src/app/common/models/typeInputEnum';

@Component({
  selector: 'app-cama-form',
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.css']
})
export class CamaFormComponent implements OnInit {

  bedForm: FormGroup;
  dataBedType: BedType[];
  dataBedSubType: BedSubType[];
  dataBedStatus: BedStatus[];
  @Input() inputType: InputType;
  @Input() bedSelected: Bed =  {
    id: '',
    description: '',
    status: '',
    type: '',
    subtype: ''
  };
  
  constructor(
    private camaService: CamaService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadDropDown();
  }
  ngOnChanges(){
    this.initForm();
    this.loadDropDown();
    this.loadCamaSelected();
  }
  initForm(){
    this.bedForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      description: new FormControl('', [Validators.required]), 
      status: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]) ,
      subtype: new FormControl('', [Validators.required])
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
  loadCamaSelected(){
    console.log('load cama selected') ;
    if (this.bedSelected.id !== null && this.bedSelected.id !== '') {
      this.bedForm.patchValue({ 
        id: this.bedSelected.id,
        description: this.bedSelected.description, 
        type: this.bedSelected.type,
        subtype: this.bedSelected.subtype,
        status: this.bedSelected.status
      })
    }
  }
  onSubmit(){
    if(this.inputType===InputType.create){
      this.createBed();
    }else if(this.inputType===InputType.edit){
      this.updateBedById();
    }
  }
  onCancel(){
    this.inputType = InputType.cancel;
  }
  createBed(){
    console.log(this.bedForm.value);
    
    this.camaService.createBed(this.bedForm.value).subscribe({
      next: res => {
      //this.data = res;
      console.log('resultado del guardado', res);
      },
    });
  }
  updateBedById(){
    console.log(this.bedForm.value);
    
    this.camaService.updateBedById(this.bedForm.value).subscribe({
      next: res => {
      //this.data = res;
      console.log('resultado de la actualizacion', res);
      },
    });
  }  
}