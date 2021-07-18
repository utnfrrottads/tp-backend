import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

import { NivelService } from '../../../services/nivel.service';

import { Nivel } from '../../../models/Nivel';

declare var $: any;

@Component({
  selector: 'app-update-nivel',
  templateUrl: './update-nivel.component.html',
  styleUrls: ['./update-nivel.component.scss']
})
export class UpdateNivelComponent implements OnInit {

  @Output() getNiveles = new EventEmitter();

  @Input() editMode: Boolean = false;
  @Input() nivel: Nivel = {
    _id: '',
    nro: 0,
    contratosMinimos: 0
  };
  @Input() nivelEditando: Number = 0;
  
  errorMessage = '';

  constructor(private nivelService: NivelService) { }

  ngOnInit(): void {
  }

}
