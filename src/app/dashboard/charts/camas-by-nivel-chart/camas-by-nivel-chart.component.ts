import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-camas-by-nivel-chart',
  templateUrl: './camas-by-nivel-chart.component.html',
  styleUrls: ['./camas-by-nivel-chart.component.css']
})
export class CamasByNivelChartComponent {

  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Centro de salud', 'Hospitales', 'Alta complejidad'];

  public radarChartData: ChartDataSets[] = [
    { data: [74, 80, 90 ], label: 'Ocupación' }
  ];
  public radarChartType: ChartType = 'radar';
}
