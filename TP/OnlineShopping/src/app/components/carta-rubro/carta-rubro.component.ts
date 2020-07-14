import { Component, OnInit, Input } from '@angular/core';
import {Rubro} from '../../model/rubros';
@Component({
  selector: 'app-carta-rubro',
  templateUrl: './carta-rubro.component.html',
  styleUrls: ['./carta-rubro.component.scss']
})
export class CartaRubroComponent implements OnInit {

  @Input() rubro:Rubro;
  constructor() { }

  ngOnInit(): void {
  }

}
