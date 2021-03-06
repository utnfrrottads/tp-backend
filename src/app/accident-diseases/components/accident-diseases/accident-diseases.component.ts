import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { InputType } from 'src/app/common/models/typeInputEnum';
import { DialogService } from 'src/app/common/services/dialog.service';
import { AccidentOrDiseases, AccidentOrDiseasesResult } from '../../models/accidentOrDiseases';
import { AccidentDiseasesService } from '../../services/accident-diseases.service';

@Component({
  selector: 'app-accident-diseases',
  templateUrl: './accident-diseases.component.html'
})
export class AccidentDiseasesComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dataAccidentOrDisease: AccidentOrDiseases[];
  accidentOrDiseasesSelected: AccidentOrDiseases = {
    id: '',
    description: '',
  };
  inputType: number = InputType.create;
  flagListIsReady = false;

  constructor(
    private accidentDiseasesService: AccidentDiseasesService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getAllAccidentsOrDiseases();
  }

  getAllAccidentsOrDiseases(): void {
    this.flagListIsReady = true;
    this.accidentDiseasesService.getAllAccidentsOrDiseases().subscribe({
      next: res => {
        this.dataAccidentOrDisease = res.accidentOrDiseases;
        this.flagListIsReady = false;
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer obtener las Accidentes-Enfermedades', 'Cerrar');
      }
    });
  }

  setInputTypeCreate(): void {
    this.accordion.openAll();
    this.inputType = InputType.create;
  }
  onAccidentDiseaseSelected(accidentOrDiseases: AccidentOrDiseases): void {
    this.accordion.openAll();
    this.accidentOrDiseasesSelected = accidentOrDiseases;
    this.inputType = InputType.edit;
  }
  onAccidentDiseaseDeleted(accidentOrDiseases: AccidentOrDiseases): void {
    this.accidentDiseasesService.deleteAccidentOrDiseaseById(accidentOrDiseases).subscribe({
      next: res => {
        // Para no ir de nuevo al backend y reducir la red
        this.dataAccidentOrDisease = this.dataAccidentOrDisease.filter( item => !(item.id === accidentOrDiseases.id));
        this.dialogService.openSnackBar('El Accidente-Enfermedad se ha eliminado correctamente', 'Perfecto!');
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer eliminar el Accidente-Enfermedad', 'Cerrar');
       }
    });
  }
  onAccidentDiseaseCreated(accidentOrDiseases: AccidentOrDiseases): void {
    this.accidentDiseasesService.createAccidentOrDisease(accidentOrDiseases).subscribe({
      next: res => {
        this.accordion.closeAll();
        this.dialogService.openSnackBar('Se insertó exitosamente', 'Perfecto!');
        this.getAllAccidentsOrDiseases();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer agregar el Accidente-Enfermedad', 'Cerrar');
       }
    });
  }
  onAccidentDiseaseEdited(accidentOrDiseases: AccidentOrDiseases): void {
    this.accidentDiseasesService.updateAccidentOrDiseaseById(accidentOrDiseases).subscribe({
      next: res => {
        this.accordion.closeAll();
        this.dialogService.openSnackBar('Se actualizó exitosamente', 'Perfecto!');
        this.getAllAccidentsOrDiseases();
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer editar el Accidente-Enfermedad', 'Cerrar');
       }
    });
  }
  isCreate(): boolean{
    return this.inputType === 1 ? true : false;
  }
}
