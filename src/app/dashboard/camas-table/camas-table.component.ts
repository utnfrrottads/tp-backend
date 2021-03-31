import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CamasTableDataSource, CamasEfectoresItem } from './camas-table-datasource';
import { BedService } from 'src/app/bed/services/bed.service';

@Component({
  selector: 'app-camas-table',
  templateUrl: './camas-table.component.html',
  styleUrls: ['./camas-table.component.css']
})
export class CamasTableComponent implements AfterViewInit, OnInit {
   

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CamasEfectoresItem>;
  dataLength: number;
  dataSource: CamasTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'efector',
    'ciudad',
    'nivelAtencion',
    'obraSocial',
    'cama',
    'diasOcupada',
  ];

  constructor(
    private bedService: BedService
    ){}

  ngOnInit(): void{
    this.dataSource = new CamasTableDataSource(this.bedService);

    this.bedService.getBedCount().subscribe({
      next: orderCount => {
      this.dataLength = orderCount[0];
      }
    });
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getClassChip(diasOcupada: number): string{
    return diasOcupada <= 5 ? 'warn'
          : ( diasOcupada <= 10 ? 'accent'
            : 'primary' );
  }
}
