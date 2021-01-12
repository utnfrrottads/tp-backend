import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { Bed } from '../../models/bed' 
 
@Component({
  selector: 'app-cama-list',
  templateUrl: './cama-list.component.html'
})
export class CamaListComponent { 

  @Input() dataBed: Bed[];   
  @Output() bedSelected = new EventEmitter();
  @Output() bedDeleted = new EventEmitter();
  displayedColumns: string[] = ['description', 'status', 'type', 'subtype', 'hospitalName', 'actions'];
 
  editBed(bed: Bed){
    this.bedSelected.emit(bed);
  }
  deleteBed(bed: Bed) {
    this.bedDeleted.emit(bed);
  }
}
