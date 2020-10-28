import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   // Doughnut
   public doughnutChartLabels:string[] = ['Techado', 'Aire libre'];
   public doughnutChartData:number[] = [120, 450, ];
   public doughnutChartType:string = 'doughnut';
 
}
