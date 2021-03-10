import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'src/app/common/services/dialog.service';
import { Emergency } from '../../models/emergency';
import { EmergencyService } from '../../services/emergency.service';

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.css']
})
export class EmergencyListComponent implements OnInit {

  @Input() allowEdit = false;
  @Input() allowDelete = false;
  @Input() allowSelect = false;
  // @Input() dataEmergency: Emergency[];
  dataEmergency: Emergency[];
  @Output() emergencyDeleted = new EventEmitter();
  @Output() emergencySelected = new EventEmitter();
  displayedColumns: string[] = ['dateOfEntrance', 'dateOfExit', 'accidentOrDisease', 'locality', 'ambulanceLicensePlate'];

  constructor(
    private emergencyService: EmergencyService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void{
    this.getEmergencies();
  }

  getEmergencies(): void{
    this.emergencyService.getEmergencies().subscribe({
      next: res => {
        console.log('getEmergencies', res);
        this.dataEmergency = res.emergency;
      },
      error: err => {
        this.dialogService.openSnackBar('Ups... algo falló al querer obtener las emergencias', 'Cerrar');
      }
    });
  }

}
