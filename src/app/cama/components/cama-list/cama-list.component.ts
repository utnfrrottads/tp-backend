 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cama } from '../../models/cama'
 
@Component({
  selector: 'app-cama-list',
  templateUrl: './cama-list.component.html',
  styleUrls: ['./cama-list.component.sass']
})
export class CamaListComponent implements OnInit { 
  @Input() dataCama: Cama[];   
  @Output() camaSelected = new EventEmitter();
  displayedColumns: string[] = ['id', 'descripcion', 'estadoCama', 'tipoCama', 'actions'];

  constructor() { }

  ngOnInit() {
    console.log(this.dataCama);
  }
  editCama(cama: Cama){
    console.log('se emitió');
    this.camaSelected.emit(cama);
  }
  deleteCama(cama: Cama){
    console.log('cama eliminada'); // to do
  }
}
