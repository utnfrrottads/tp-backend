import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html'
})
export class PersonListComponent{ 
  
  @Input() dataPerson: Person[];   
  @Output() personSelected = new EventEmitter();
  @Output() personDeleted = new EventEmitter();
  displayedColumns: string[] 
    = [//'id',
      'dni',
      'firstName','lastName',
      'bornDate','gender',
      'bloodType',
      'nurseWorkId',
      // ,'user','password'
      //'healthInsurances',
      'actions']; 

  editPerson(person: Person){
    this.personSelected.emit(person);
  }
  deletePerson(person: Person) {
    this.personDeleted.emit(person);
  } 

}
