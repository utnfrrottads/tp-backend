import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CamaService } from '../../services/cama-service.service';
import { BedType, BedStatus, Bed, BedSubType } from '../../models/bed';

@Component({
  selector: 'app-cama-form',
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.sass']
})
export class CamaFormComponent implements OnInit {

  bedForm: FormGroup;
  dataBedType: BedType[];
  dataBedSubType: BedSubType[];
  dataBedStatus: BedStatus[];
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
    this.loadTipoCama();
    this.loadSubTipoCama();
    this.loadEstadoCama();
  }
  ngOnChanges(){ 
    this.loadCamaSelected();
  }
  initForm(){
    this.bedForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required]), 
      status: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]) ,
      subtype: new FormControl('', [Validators.required])
    }); 
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
    if (this.bedSelected !== undefined && this.bedSelected.id !== null) {
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
    this.createBed();
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
}