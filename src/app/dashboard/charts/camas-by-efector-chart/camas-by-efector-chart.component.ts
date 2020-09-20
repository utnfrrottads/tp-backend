import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-camas-by-efector-chart',
  templateUrl: './camas-by-efector-chart.component.html',
  styleUrls: ['./camas-by-efector-chart.component.css']
})
export class CamasByEfectorChartComponent implements OnInit {

  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Heca', 'Eva Perón', 'Parque', 'Centro', 'Mapaci', 'Centenario', 'Carrasco'];

  public radarChartData: ChartDataSets[] = [
    { data: [89, 84, 88, 92, 81, 84, 85], label: 'UTI' },
    { data: [86, 85, 83, 85, 90, 88, 91], label: 'Sala' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() { }

  ngOnInit() {
  }

}
