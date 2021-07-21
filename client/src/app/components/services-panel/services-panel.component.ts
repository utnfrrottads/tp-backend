import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Servicio } from '../../models/Servicio';

@Component({
  selector: 'app-services-panel',
  templateUrl: './services-panel.component.html',
  styleUrls: ['./services-panel.component.scss'],
})
export class ServicesPanelComponent implements OnInit {
  servicios: Servicio[] = [];
  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.servicesService.get().subscribe(
      (res: any) => {
        this.servicios = res.data.servicios;
        console.log(this.servicios);
      },
      (err: any) => console.log(err)
    );
    console.log(this.servicios);
  }
}
