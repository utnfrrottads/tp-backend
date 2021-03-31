import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Person, PersonHealthInsurance, PersonHealthInsuranceResult } from '../../models/person';
import { HealthInsurance } from '../../../health-insurance/models/health-insurance';
import { PersonService } from '../../services/person.service';
import { DialogService } from 'src/app/common/services/dialog.service';
import { InputType } from '../../../common/models/typeInputEnum';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public dataPerson: Person[];
  personSelected: Person = {
    id: '',
    dni: 0,
    firstName: '',
    lastName: '',
    bornDate: '',
    gender: '',
    phone: '',
    bloodType: null,
    emergencyContact: null,

    nurseWorkId: null,
    user: null,
    password: null,
    healthInsurances:  null,
    idHealthInsurance: '', // nuevo nombre sera idHealthInsurance
  };

  personHealthInsuranceResultData: PersonHealthInsuranceResult = {
    persons : this.personSelected,
    healthInsurances : [],
    msg: '',
    success: false
  };
  inputType: number = InputType.create;
  flagListIsReady = false;

  constructor(
    private personService: PersonService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void{
    this.getPersons();
  }

  setInputTypeCreate(): void{
    this.accordion.openAll();
    this.inputType = InputType.create;
  }
  getPersons(): void{
    this.flagListIsReady = true;
    this.personService.getPersons().subscribe({
      next: res => {
        this.dataPerson = res.persons;
        this.flagListIsReady = false;
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer cargar las Personas', 'Cerrar');
      }
    });
  }
  onPersonSelected(person: Person): void{
    this.accordion.openAll();
    this.personSelected = person;
    this.inputType = InputType.edit;
    this.getPersonAndHealthInsurancesByDni();
  }
  onPersonDeleted(person: Person): void{
    this.personService.deletePersonById(person).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataPerson = this.dataPerson.filter( item => !(item.id === person.id));
        this.dialogService.openSnackBar('La persona se ha eliminado correctamente', 'Perfecto!');
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer eliminar la persona', 'Cerrar');
       }
    });
  }
  onPersonCreated(person: Person): void{
    this.personService.createPerson(person).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.dialogService.openSnackBar('Se insertó exitosamente', 'Perfecto!');
       // this.getPersons();
       this.dataPerson = this.dataPerson.concat(person);
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer agregar la persona', 'Cerrar');
       }
    });
  }
  onPersonEdited(person: Person): void{
    this.personService.updatePersonById(person).subscribe({
      next: res => {
       this.accordion.closeAll();
       this.dialogService.openSnackBar('Se actualizó exitosamente', 'Perfecto!');
       this.getPersons();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer editar la persona', 'Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType === 1 ? true : false;
  }
  resetForm(): void{
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

  // ***************************************************************
  // ********************* HEALT INSURANCES ************************
  // ***************************************************************

  onPersonHealthInsuranceCreated(personHealthInsurance: PersonHealthInsurance): void{
    this.personService.createAffiliatedHealthInsurance(personHealthInsurance).subscribe({
      next: res => {
       this.dialogService.openSnackBar('Se creó la afiliación a la obra social exitosamente', 'Perfecto!');
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer agregar la afiliación a la obra social', 'Cerrar');
       }
    });
  }

  getPersonAndHealthInsurancesByDni(): void{
    this.personService.getPersonAndHealthInsurancesByDni(this.personSelected.dni).subscribe({
      next: res => {
        this.personHealthInsuranceResultData = res;
    },
    error: err => {
      this.dialogService.openSnackBar(err.error.msg, 'Cerrar');
     }
    });
  }
  onHealthInsuranceDeleted(healthInsurance: HealthInsurance): void{
    alert('no implementado');
  }

}
