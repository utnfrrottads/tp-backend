import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CamaService } from '../../services/cama-service.service';
import { TipoCama, EstadoCama } from '../../models/cama';

@Component({
  selector: 'app-cama-form',
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.sass']
})
export class CamaFormComponent implements OnInit {

  camaForm: FormGroup;
  dataTipoCama: TipoCama[];
  dataEstadoCama: EstadoCama[];

  constructor(
    private camaService: CamaService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadTipoCama();
    this.loadEstadoCama();
  }

  onSubmit(){
    console.log(this.camaForm.value);
  }
  initForm(){
    this.camaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      estado: new FormControl(true, [Validators.required]),
      tipoCama: new FormControl(''),
      estadoCama: new FormControl('')
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

}


