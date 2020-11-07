import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  public radarChartLabels: string[] = ['Cancha1', 'Cancha2', 'Cancha3', 'Cancha4', 'Cancha5', 'Cancha6', 'Cancha7'];

  public radarChartData: any = [
    {data: [25, 35, 39, 30, 31, 26, 25], label: 'Usuario común'},
    {data: [5, 3, 1, 12, 3, 4, 7], label: 'Usuario administrador de centro'}
  ];
  public radarChartType = 'radar';
  constructor() { }

  ngOnInit(): void {
  }
}
