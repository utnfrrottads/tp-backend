import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BedService } from 'src/app/bed/services/bed.service';

@Component({
  selector: 'app-annual-camas-chart',
  templateUrl: './annual-camas-chart.component.html',
  styleUrls: ['./annual-camas-chart.component.css']
})
export class AnnualCamasChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Camas por mes' },
  ];
  public lineChartLabels: Label[] = [];
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

  constructor(
    private bedService: BedService
  ) { }

  ngOnInit(): void{
    this.getCamaData();
  }

  getCamaData(): void{
    this.bedService.getBedsByMonth().subscribe({
      next: camasItem => {
        camasItem.forEach(li => {
          this.lineChartData[0].data.push(li.count);
          this.lineChartLabels.push(li.month);
        });
      }
    });
  }

}
