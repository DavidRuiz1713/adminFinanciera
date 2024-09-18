/**
 * Servicio que permite intercambiar datos de la seleccion de un determindado
 * producto entre varios componentes que no tengan relacion
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosSeleccionadosService {
  private producto: any;

  setProducto(producto: any): void {
    this.producto = producto;
  }

  getProducto(): any {
    return this.producto;
  }

  clearProducto() {
    this.producto = null;
  }
}
