import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common.service';
import { AccidentOrDiseases, AccidentOrDiseasesResult } from '../../models/accidentOrDiseases';
import { AccidentDiseasesService } from '../../services/accident-diseases.service';

@Component({
  selector: 'app-accident-diseases',
  templateUrl: './accident-diseases.component.html',
  styleUrls: ['./accident-diseases.component.sass']
})
export class AccidentDiseasesComponent implements OnInit {

  dataAccidentOrDisease: AccidentOrDiseases[];

  constructor(
    private accidentDiseasesService: AccidentDiseasesService,
    private commonService: CommonService
  ) { }
  ngOnInit(): void {
    this.getHospitalAccidentOrDisease();
  }

  /** Se obtienen los accidentes y enfermedades que atiende un hospital */
  getHospitalAccidentOrDisease(): void {
    this.accidentDiseasesService.getAllAccidentsOrDiseases().subscribe({
      next: res => {
        this.dataAccidentOrDisease = res.accidentOrDiseases;
      },
      error: err => {
        this.commonService.openSnackBar('Ups... algo falló al querer obtener las Accidentes-Enfermedades del hospital.', 'Cerrar');
      }
    });
  }
}
