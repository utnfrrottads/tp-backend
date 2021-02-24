import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bed } from '../../models/bed';

@Component({
  selector: 'app-bed-list',
  templateUrl: './bed-list.component.html',
  styleUrls: ['./bed-list.component.css']
})
export class BedListComponent {

  @Input() allowEdit = false;
  @Input() allowDelete = false;
  @Input() allowSelect = false;
  @Input() dataBed: Bed[];
  @Output() bedSelected = new EventEmitter();
  @Output() bedDeleted = new EventEmitter();
  displayedColumns: string[] = ['description', 'status', 'type', 'subtype', 'hospitalName', 'actions'];
  selectedRowIndex: any;

  editBed(bed: Bed): void {
    this.bedSelected.emit(bed);
  }
  deleteBed(bed: Bed): void {
    this.bedDeleted.emit(bed);
  }
  selectBed(bed: Bed): void {
    this.bedSelected.emit(bed);
    this.selectedRowIndex = bed.id;
  }
}
