import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { CamaService } from 'src/app/cama/services/cama-service.service';

// TODO: Replace this with your own data model type
export class CamasEfectoresItem { //to do<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  efector: string;
  ciudad: string;
  nivelAtencion: string;
  obraSocial: string;
  cama: string;
  diasOcupada: number; 
}  

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CamasEfectoresItem[] = [ 
  {efector: 'Eva Perón', ciudad: 'Baigorria',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 10 },
  {efector: 'Eva Perón', ciudad: 'Baigorria',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 11 },
  {efector: 'Eva Perón', ciudad: 'Baigorria',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 5 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 5 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 2 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 20 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 8 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 14 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 0 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 8 },
  {efector: 'HECA', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 1 },
  {efector: 'Hosp. Niños zona norte', ciudad: 'Rosario',nivelAtencion: 'Media complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 4 },
  {efector: 'Hosp. Niños zona norte', ciudad: 'Rosario',nivelAtencion: 'Media complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 15 },
  {efector: 'Hosp. Niños zona norte', ciudad: 'Rosario',nivelAtencion: 'Media complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 34 },
  {efector: 'Hosp. Niños zona norte', ciudad: 'Rosario',nivelAtencion: 'Media complejidad', obraSocial: 'Público', cama: 'UTI', diasOcupada: 3 },
  {efector: 'Sanatorio Parque Centro', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Privado', cama: 'UTI', diasOcupada: 6 },
  {efector: 'Sanatorio Parque Centro', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Privado', cama: 'UTI', diasOcupada: 1 },
  {efector: 'Sanatorio Parque Centro', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Privado', cama: 'UTI', diasOcupada: 9 },
  {efector: 'Sanatorio Parque Centro', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Privado', cama: 'UTI', diasOcupada: 35 },
  {efector: 'Sanatorio Parque Centro', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Privado', cama: 'UTI', diasOcupada: 15 },
  {efector: 'Sanatorio Parque Centro', ciudad: 'Rosario',nivelAtencion: 'Alta complejidad', obraSocial: 'Privado', cama: 'UTI', diasOcupada: 0 },
];
 
/**
 * Data source for the CamasTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CamasTableDataSource extends DataSource<CamasEfectoresItem> {
  data: CamasEfectoresItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
 
  constructor(private camaService: CamaService) {
    super();
  }

  
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CamasEfectoresItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: CamasEfectoresItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CamasEfectoresItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'efector': return compare(a.efector, b.efector, isAsc);
        case 'ciudad': return compare(+a.ciudad, +b.ciudad, isAsc);
        case 'nivelAtencion': return compare(+a.nivelAtencion, +b.nivelAtencion, isAsc);
        case 'obraSocial': return compare(+a.obraSocial, +b.obraSocial, isAsc);
        case 'cama': return compare(+a.cama, +b.cama, isAsc);
        case 'diasOcupada': return compare(+a.diasOcupada, +b.diasOcupada, isAsc);
        default: return 0;
      }
    });
  }
}
 
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
} 