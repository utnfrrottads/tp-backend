import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cama-form',
  templateUrl: './cama-form.component.html',
  styleUrls: ['./cama-form.component.sass']
})
export class CamaFormComponent implements OnInit {

  camaForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.camaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    console.log(this.camaForm.value);
  }

}
