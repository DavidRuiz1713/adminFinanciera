/**
 * Servicio principal que contiene toda la logica del crud para los Productos
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import {
  ProductosInterface,
  RespuestaAPI,
} from '../interface/productos-interface';
import { ProductosResponse } from '../modelos/productos-response';
import { ProductosMapper } from '../mappers/productos-mapper';
type RespuestaBase = { [key: string]: unknown };
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  //Inyectamos el servicio HTTPClient
  private httpClient = inject(HttpClient);
  // Subject para notificar cuando un producto es agregado
  private productSubject = new BehaviorSubject<{
    operacion: string;
    mensaje: string;
    productoId: string;
  } | null>(null);
  productoAgregado$ = this.productSubject.asObservable();

  // Subject para notificar errores
  private errorSubject = new Subject<string>();
  public error$: Observable<string | null> = this.errorSubject.asObservable();
  private urlPrincipal: string = 'http://localhost:3002/bp/products';
  constructor() {}

  /**
   * Método para obtener todos los productos desde la api
   * @returns
   */
  obtenerTodosProductos(): Observable<ProductosInterface[]> {
    return this.httpClient.get<RespuestaAPI>(this.urlPrincipal).pipe(
      map((response: RespuestaAPI) => response.data),
      map((productos: ProductosInterface[]) =>
        productos.map((producto) => ProductosMapper.map(producto)),
      ),
      catchError((error) => {
        const errorMessage = 'Error al obtener productos';
        this.errorSubject.next(errorMessage);
        return of([]);
      }),
    );
  }

  /**
   * Método para agregar un producto
   * @returns
   */
  agregarProducto(producto: any): Observable<any> {
    return this.httpClient.post<any>(this.urlPrincipal, producto).pipe(
      map((response: any) => {
        // Notificamos que se ha agregado un producto
        this.productSubject.next({
          operacion: 'adicion',
          mensaje: response.message,
          productoId: producto.id,
        });
        return response;
      }),
      catchError((error) => {
        const errorMessage = error.error;
        this.errorSubject.next(errorMessage);
        return of();
      }),
    );
  }

  /**
   * Método para editar un producto
   * @returns
   */
  editarProducto(producto: any): Observable<any> {
    const url = this.urlPrincipal + `/${producto.id}`;
    return this.httpClient.put<any>(url, producto).pipe(
      map((response: any) => {
        this.productSubject.next({
          operacion: 'edicion',
          mensaje: response.message,
          productoId: producto.id,
        });
        return response;
      }),
      catchError((error) => {
        const errorMessage = error.error;
        this.errorSubject.next(errorMessage);
        return of();
      }),
    );
  }

  /**
   * Método para eliminar un producto por su ID
   *
   * @param id - El ID del producto que se desea eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminarProducto(id: string): Observable<any> {
    const url = this.urlPrincipal + `/${id}`;
    return this.httpClient.delete<any>(url).pipe(
      tap((response) => {
        this.productSubject.next({
          operacion: 'eliminacion',
          mensaje: response.message,
          productoId: id,
        });
      }),
      catchError((error) => {
        const errorMessage = error.error;
        this.errorSubject.next(errorMessage.message);
        return of();
      }),
    );
  }
  /**
   * Método que consulta si el id está repetido
   * @param id
   * @returns
   */
  consultarIdProducto(id: string): Observable<boolean> {
    const url = `http://localhost:3002/bp/products/verification/${id}`;
    return this.httpClient.get<boolean>(url);
  }

  // Método para limpiar el mensaje
  limpiarMensaje() {
    this.productSubject.next(null);
  }
}
