import { Component, OnInit, EventEmitter, Output} from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/person/services/person.service';
import { PersonHealthInsuranceResult } from 'src/app/person/models/person';
import { DialogService } from 'src/app/common/services/dialog.service';
import { AccidentOrDiseases } from 'src/app/accident-diseases/models/accidentOrDiseases';
import { Router } from '@angular/router';
import { HealthInsurance } from 'src/app/health-insurance/models/health-insurance';

@Component({
  selector: 'app-emergency-person',
  templateUrl: './emergency-person.component.html',
  styleUrls: ['./emergency-person.component.css']
})
export class EmergencyPersonComponent implements OnInit {
  @Output() personSelected = new EventEmitter();
  healthInsurance: HealthInsurance;
  personForm: FormGroup;
  dataAccidentOrDiseases: AccidentOrDiseases[];
  personHealthInsuranceResultData: PersonHealthInsuranceResult = {
    persons : {
      id: '',
      dni: 0,
      firstName: '',
      lastName: '',
      bornDate: '', // Date
      gender: '',
      phone: '',
      bloodType: '',
      nurseWorkId: '',
      user: '',
      password: '',
      healthInsurances: [],    // TODO opcional ?
      healthInsuranceId: ''
    },
    healthInsurances : [],
    msg: '',
    success: false
  };
  flagGetPersonHealth = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.personForm = new FormGroup({
      dni: new FormControl(''), // ,[Validators.required]
    });
  }

  getPersonAndHealthInsurancesByDni(): void{
    this.flagGetPersonHealth = true;
    this.personService.getPersonAndHealthInsurancesByDni(this.personForm.controls.dni.value).subscribe({
      next: res => {
        this.personHealthInsuranceResultData = res; 
        this.flagGetPersonHealth = false;
    },
    error: err => {
      this.flagGetPersonHealth = false;
      this.dialogService.openSnackBar(err.error.msg, 'Cerrar');
     }
    });
  }

  redirectToPersonForm(): void{
    this.router.navigate(['personas']);
  }

  onSelectHealthInsurance(healthInsurance: HealthInsurance): void{
    this.healthInsurance = healthInsurance;
  }

  selectPerson(): void{
    const personHI = {
      person: this.personHealthInsuranceResultData.persons,
      healthInsurance: this.healthInsurance
    };
    this.personSelected.emit(personHI);
  }

}
