import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-efector-obra-social-chart',
  templateUrl: './efector-obra-social-chart.component.html',
  styleUrls: ['./efector-obra-social-chart.component.css']
})
export class EfectorObraSocialChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['OSDE', 'Swiss Medical', 'OMIN', 'Sancor', 'Escencial', 'Caja Forense', 'OSECAC'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'COVID' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Otros' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
