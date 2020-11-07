import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(state: string): string {
    if ( state === 'Reserved'){
      return 'Reservado';
    }
    if (state === 'Completed'){
      return 'Finalizado';
    }
    if (state === 'InProgress'){
      return 'En curso';
    }
    if (state === 'AboutToStart'){
      return 'Por comenzar';
    }
  }

}
