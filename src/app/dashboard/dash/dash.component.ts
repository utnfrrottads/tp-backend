import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BedSummary } from 'src/app/bed/models/bed';
import { BedService } from 'src/app/bed/services/bed.service';
import { HospitalService } from 'src/app/hospital/services/hospital.service';
import { HealthInsurance } from 'src/app/health-insurance/models/health-insurance';
import { HealthInsuranceService } from 'src/app/health-insurance/services/health-insurance.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
      columns: 4,
      miniCard: { cols: 1, rows: 1 },
      chart: { cols: 2, rows: 2 },
      table: { cols: 4, rows: 4 },
    };
    })
  );

  miniCardData: BedSummary[];
  dataHealthInsurance: HealthInsurance[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bedService: BedService,
    private healthInsuranceService: HealthInsuranceService,
    ) {}

  ngOnInit(): void{
    this.getBedSummary();
    this.getBeds();
  }
  getBedSummary(): void{
    this.bedService.getBedSummary().subscribe({
      next: summaryData => {
        this.miniCardData = summaryData;
      }
    });
  }
  getBeds(): void{
    this.healthInsuranceService.getHealthInsurances().subscribe({
      next: data => {
        this.dataHealthInsurance = data.healthInsurances;
      }
    });
  }
}
