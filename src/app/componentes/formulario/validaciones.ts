import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductosService } from '../../core/servicios/productos.service';

export function consultarProductoValidator(
  productosService: ProductosService,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); // Si no hay valor, no validamos
    }

    return productosService.consultarIdProducto(control.value).pipe(
      map((existe: boolean) => (existe ? { productoExistente: true } : null)),
      catchError(() => of(null)), // En caso de error en la API, no bloqueamos la validación
    );
  };
}
