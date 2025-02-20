import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ProductosComponent from './paginas/productos/productos.component';
import AgregarProductosComponent from './paginas/agregar-productos/agregar-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductosComponent, AgregarProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'administracion-financiera';
}
