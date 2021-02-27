import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputType } from '../../../common/models/typeInputEnum';
import { AccidentOrDiseases } from '../../models/accidentOrDiseases';
import { AccidentDiseasesService } from '../../services/accident-diseases.service';

@Component({
  selector: 'app-accident-diseases-form',
  templateUrl: './accident-diseases-form.component.html',
  styleUrls: ['./accident-diseases-form.component.css']
})
export class AccidentDiseasesFormComponent implements OnInit, OnChanges {

  @Input() inputType: InputType;
  @Input() accidentDiseasesSelected: AccidentOrDiseases;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  accidentDiseasesForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }
  ngOnChanges(): void {
    this.initForm();
    this.loadAccidentDiseasesSelected();
  }
  initForm(): void {
    this.accidentDiseasesForm = new FormGroup({
      id: new FormControl(''),
      description: new FormControl('', [Validators.required]),
    });
  }
  loadAccidentDiseasesSelected(): void {
    if (this.accidentDiseasesSelected !== undefined
      && this.accidentDiseasesSelected.id !== null
      && this.accidentDiseasesSelected.id !== '') {
      this.accidentDiseasesForm.patchValue({
        id: this.accidentDiseasesSelected.id,
        description: this.accidentDiseasesSelected.description,
      });
    }
  }
  onSubmit(): void {
    if (this.inputType === InputType.create){
      this.add.emit(this.accidentDiseasesForm.value);
    } else if (this.inputType === InputType.edit){
      this.edit.emit(this.accidentDiseasesForm.value);
    }
  }
  setButtonText(): string {
    return this.inputType === InputType.edit ? 'Actualizar' : 'Agregar';
  }
}
