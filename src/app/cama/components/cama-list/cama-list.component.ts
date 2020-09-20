import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cama } from '../../models/cama'


@Component({
  selector: 'app-cama-list',
  templateUrl: './cama-list.component.html',
  styleUrls: ['./cama-list.component.sass']
})
export class CamaListComponent implements OnInit {

  public listCama = ['Covid 1', 'Covid 2', 'Covid 3', 'UIT'];
  //     <Cama>
  // cama.Nombre   

  @Input() list: any[];
  @Output() itemRemoved = new EventEmitter();
  @Output() itemStateChanged = new EventEmitter();
  @Output() camaSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  removeItem(id) {
    this.itemRemoved.emit(id);
  }

  completeTask(item:Cama) {
    this.itemStateChanged.emit(item);

  }

  editTask(task){
    this.camaSelected.emit(task);
  }

}
