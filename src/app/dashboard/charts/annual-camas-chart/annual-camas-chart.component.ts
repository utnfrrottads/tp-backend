import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-annual-camas-chart',
  templateUrl: './annual-camas-chart.component.html',
  styleUrls: ['./annual-camas-chart.component.css']
})
export class AnnualCamasChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [35, 25, 35, 49, 53, 51, 59, 69, 85, 87], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
