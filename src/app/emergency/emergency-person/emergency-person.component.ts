import { Component, OnInit, EventEmitter, Output} from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/person/services/person.service';
import { PersonHealthInsuranceResult } from 'src/app/person/models/person';
import { CommonService } from 'src/app/common/services/common.service';
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
      nurseWorkId:'',
      user:'',
      password:'',
      healthInsurances: [],    // TODO opcional ?
      healthInsuranceId:''
    },
    healthInsurances : [],
    msg:'',
    success: false
  };
  flagGetPersonHealth: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(){
    this.personForm = new FormGroup({
      dni: new FormControl('',[Validators.required]),
    })
  }
  
  getPersonAndHealthInsurancesById(): void{  
    this.flagGetPersonHealth = true;
    this.personService.getPersonAndHealthInsurancesById(this.personForm.controls.dni.value).subscribe({
      next: res => {
        this.personHealthInsuranceResultData = res; 
        this.flagGetPersonHealth = false;
    },
    error: err => {
      this.commonService.openSnackBar('Ups... algo falló al querer buscar la persona y sus obras sociales','Cerrar');
     } 
    });
  }

  getPersonAndHealthInsurancesByDni(): void{
    this.flagGetPersonHealth = true;
    this.personService.getPersonAndHealthInsurancesByDni(this.personForm.controls.dni.value).subscribe({
      next: res => {
        this.personHealthInsuranceResultData = res; 
        this.flagGetPersonHealth = false;
        console.log(this.personHealthInsuranceResultData);
    },
    error: err => {
      this.flagGetPersonHealth = false;
      this.commonService.openSnackBar(err.error.msg,'Cerrar');
     } 
    });
  }

  redirectToPersonForm(): void{
    this.router.navigate(['personas']);
  }

  onSelectHealthInsurance(healthInsurance: HealthInsurance){
    this.healthInsurance = healthInsurance;
  }

  selectPerson(){
    const personHI = {
      person: this.personHealthInsuranceResultData.persons,
      healthInsurance: this.healthInsurance
    }      
    this.personSelected.emit(personHI);
  }

}
