 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bed } from '../../models/bed'
 
@Component({
  selector: 'app-cama-list',
  templateUrl: './cama-list.component.html',
  styleUrls: ['./cama-list.component.sass']
})
export class CamaListComponent implements OnInit { 

  @Input() dataBed: Bed[];   
  @Output() bedSelected = new EventEmitter();
  displayedColumns: string[] = ['description', 'status', 'type', 'subtype', 'hospitalName', 'actions'];

  constructor() { }

  ngOnInit() {
    //console.log(this.dataCama);
  }
  editCama(bed: Bed){
    console.log('se emitió');
    this.bedSelected.emit(bed);
  }
  deleteCama(cama: Bed){
    console.log('cama eliminada'); // to do
  }
}
