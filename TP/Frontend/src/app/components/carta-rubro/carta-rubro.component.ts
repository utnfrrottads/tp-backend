import { Component, OnInit, Input } from '@angular/core';
import {Rubro} from '../../model/rubros';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carta-rubro',
  templateUrl: './carta-rubro.component.html',
  styleUrls: ['./carta-rubro.component.scss']
})
export class CartaRubroComponent implements OnInit {

  @Input() rubro: Rubro;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
  routToProducts(rubro): void {
    this.router.navigate(['/rubros', rubro._id]);
  }

}
