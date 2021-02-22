import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { Bed } from '../../models/bed' 
 
@Component({
  selector: 'app-cama-list',
  templateUrl: './cama-list.component.html'
})
export class CamaListComponent { 

  @Input() allowEdit: boolean = false;   
  @Input() allowDelete: boolean = false;
  @Input() allowSelect: boolean = false;
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
  selectBed(bed: Bed) {
    this.bedSelected.emit(bed);
  }
}
