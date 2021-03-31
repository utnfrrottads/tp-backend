import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-home',
  templateUrl: './emergency-home.component.html',
  styleUrls: ['./emergency-home.component.css']
})
export class EmergencyHomeComponent implements OnInit {

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  redirectToFastEmergency(): void{
    this.router.navigate(['emergenciaInmediata']);
  }
  redirectToListEmergency(): void{
    this.router.navigate(['emergenciaList']);
  }
}
