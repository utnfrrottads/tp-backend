import { Component, OnInit, Input } from '@angular/core';
import { CamaService } from '../services/cama-service.service';
import { Cama } from '../models/cama';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cama',
  templateUrl: './cama.component.html',
  styleUrls: ['./cama.component.sass']
})
export class CamaComponent implements OnInit {
  public dataCama : Cama[];  
  dataSource = new MatTableDataSource(this.dataCama); 
  @Input() camaSelected : Cama = {
    id: 0,
    descripcion: '',
    estadoCama: '',
    tipoCama: ''
  };

  constructor(
    private camaService: CamaService
  ) { }

  ngOnInit(): void {
    this.loadCama();
  } 
  loadCama(){
    this.camaService.getCamas().subscribe({
      next: res =>{
        this.dataCama = res;
      }
    })
  } 
  setCamaSelected(cama: Cama){
    console.log('se seteó en cama.component')
    this.camaSelected = cama;
    console.log(this.camaSelected);
  }
} 