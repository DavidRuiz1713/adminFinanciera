import { Routes } from '@angular/router';

/**
 * Configuracion de rutas para la aplicacion
 */

export const routes: Routes = [
  {
    path: 'productos',
    loadComponent: () => import('./paginas/productos/productos.component'),
  },
  {
    path: 'agregarProductos',
    loadComponent: () =>
      import('./paginas/agregar-productos/agregar-productos.component'),
  },
  {
    path: 'editarProducto',
    loadComponent: () =>
      import('./paginas/agregar-productos/agregar-productos.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./paginas/productos/productos.component'),
  },
];
