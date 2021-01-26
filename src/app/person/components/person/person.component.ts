import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Person } from '../../models/person';
import { HealthInsurance } from '../../../health-insurance/models/health-insurance';
import { PersonService } from '../../services/person.service';
import { CommonService } from 'src/app/common/services/common.service';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataPerson : Person[];
  personSelected : Person = {
    id: '',
    dni: 0,
    firstName: '',
    lastName: '',
    bornDate: '',
    gender: '',
    phone: '',
    bloodType: null,        // TODO es ok?
    emergencyContact: null, // TODO es ok?

    nurseWorkId:null,       // TODO es ok?
    user:null,              // TODO es ok?
    password:null,          // TODO es ok?
    healthInsurances:  null,// TODO es ok?
  }; 
  inputType: number = InputType.create;
  flagListIsReady: boolean = false;

  constructor(
    private personService: PersonService, 
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getPersons();
  }

  setInputTypeCreate(){
    this.accordion.openAll();  
    this.inputType = InputType.create;
  } 
  getPersons(){
    this.flagListIsReady = true;
    this.personService.getPersons().subscribe({
      next: res =>{ 
        console.log('res person list', res);
        this.dataPerson = res.persons;
        this.flagListIsReady = false;
      },
      error: err =>{
        this.commonService.openSnackBar('Ups... algo falló al querer cargar las Personas','Cerrar');
      }
    });
  }  
  onPersonSelected(person: Person){
    this.accordion.openAll();  
    this.personSelected = person;
    this.inputType = InputType.edit;
  }
  onPersonDeleted(person: Person){
    console.log('se llego a form');
    this.personService.deletePersonById(person).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataPerson = this.dataPerson.filter( item => !(item.id===person.id));
        this.commonService.openSnackBar('La persona se ha eliminado correctamente','Perfecto!');
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer eliminar la persona','Cerrar');
       } 
    });
  }
  onPersonCreated(person: Person){
    this.personService.createPerson(person).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se insertó exitosamente','Perfecto!');
       this.getPersons();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer agregar la persona','Cerrar');
       } 
    });
  }
  onPersonEdited(person: Person){ 
    this.personService.updatePersonById(person).subscribe({
      next: res => {
       this.accordion.closeAll();  
       this.commonService.openSnackBar('Se actualizó exitosamente','Perfecto!');
       this.getPersons();
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer editar la persona','Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType===1 ? true : false;
  }
  resetForm(){
    this.personSelected.id = '';
    this.personSelected.dni = 0;
    this.personSelected.firstName = '';
    this.personSelected.lastName = '';
    this.personSelected.bornDate = '';
    this.personSelected.gender = '';
    this.personSelected.phone = '';
    this.personSelected.bloodType = '';
    this.personSelected.emergencyContact = null; // TODO 
    this.personSelected.nurseWorkId = '';
    this.personSelected.user = '';
    this.personSelected.password = '';
    this.personSelected.healthInsurances = null; // TODO 
  }
}
