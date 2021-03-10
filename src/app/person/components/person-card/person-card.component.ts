import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HealthInsurance } from 'src/app/health-insurance/models/health-insurance';
import { Person, PersonHealthInsuranceResult } from '../../models/person';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.sass']
})
export class PersonCardComponent implements OnChanges {

  @Input() person: Person;

  ngOnChanges(): void {
    console.log(this.person);
  }

}
