import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CamaService } from '../../services/cama-service.service';
import { TipoCama, EstadoCama, Cama } from '../../models/cama';

@Component({
  selector: 'app-cama-form',
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.sass']
})
export class CamaFormComponent implements OnInit {

  camaForm: FormGroup;
  dataTipoCama: TipoCama[];
  dataEstadoCama: EstadoCama[];
  @Input() camaSelected: Cama =  {
    id: 0,
    descripcion: '',
    estadoCama: '',
    tipoCama: '',
    subTipo: ''
  };
  
  constructor(
    private camaService: CamaService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadTipoCama();
    this.loadEstadoCama();
  }
  ngOnChanges(){ 
    this.loadCamaSelected();
  }
  onSubmit(){
    console.log(this.camaForm.value);
  }
  initForm(){
    this.camaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]), 
      tipoCama: new FormControl('', [Validators.required]) ,
      estadoCama: new FormControl('', [Validators.required])
    }); 
  }
  loadTipoCama(){
    this.camaService.getTipoCama().subscribe({
      next: res => {
      this.dataTipoCama = res;
      }, 
    });  
  }
  loadEstadoCama(){
    this.camaService.getEstadoCama().subscribe({
      next: res => {
      this.dataEstadoCama = res;
      }, 
    });  
  }
  loadCamaSelected(){
    // console.log('load cama selected') ;
    // if (this.camaSelected !== undefined && this.camaSelected.id !== null) {
    //   this.camaForm.patchValue({ 
    //     id: this.camaSelected.id,
    //     descripcion: this.camaSelected.descripcion, 
    //     tipoCama: this.camaSelected.tipoCama,
    //     estadoCama: this.camaSelected.estadoCama
    //   })
    // }
  }
}