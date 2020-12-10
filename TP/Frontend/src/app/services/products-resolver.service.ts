import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCardsService } from './product-cards.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<any> {

  descripcionParameter = '';
  rubroParameter = '';
  empresaParameter = '';

  constructor(private service: ProductCardsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

      this.descripcionParameter = route.params.searchKey;
      this.rubroParameter = route.params.idRubro;
      this.empresaParameter = route.params.idEmpresa;

      if (this.descripcionParameter) {
        return this.service.getProductosByDescripcion(this.descripcionParameter);
      } else if (this.rubroParameter) {
                return this.service.getProductosByRubro(this.rubroParameter);
      } else if (this.empresaParameter) {
        return this.service.getProductosByEmpresa(this.empresaParameter);

      } else {
        return this.service.getProductos();
      }
  }

}
