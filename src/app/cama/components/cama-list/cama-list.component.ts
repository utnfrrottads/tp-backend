 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/common/services/common.service';
import { Bed } from '../../models/bed'
import { CamaService } from '../../services/cama-service.service';
 
@Component({
  selector: 'app-cama-list',
  templateUrl: './cama-list.component.html'
})
export class CamaListComponent { 

  @Input() dataBed: Bed[];   
  @Output() bedSelected = new EventEmitter();
  @Output() bedDeleted = new EventEmitter();
  displayedColumns: string[] = ['description', 'status', 'type', 'subtype', 'hospitalName', 'actions'];

  constructor() { }
 

  editBed(bed: Bed){
    this.bedSelected.emit(bed);
  }
  deleteBed(bed: Bed) {
    this.bedDeleted.emit(bed);
  }
  
}
