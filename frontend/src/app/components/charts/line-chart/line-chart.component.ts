import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Lunes' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Martes' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Miercoles' },
    { data: [90, 48, 22, 33, 19, 57, 46], label: 'Jueves' },
    { data: [28, 88, 27, 20, 90, 36, 55], label: 'Viernes' },
    { data: [48, 68, 47, 96, 60, 78, 78], label: 'Sabado' },
    { data: [58, 28, 67, 29, 19, 67, 99], label: 'Domingo' }
  ];

  public lineChartLabels: Array<any> = ['Lunes', 'Martes', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [];

  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor() { }

  ngOnInit(): void {
  }
}
