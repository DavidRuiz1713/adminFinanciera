import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormularioComponent } from '../../componentes/formulario/formulario.component';

@Component({
  selector: 'app-agregar-productos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormularioComponent],
  templateUrl: './agregar-productos.component.html',
  styleUrl: './agregar-productos.component.less',
})
export default class AgregarProductosComponent {
  constructor(private router: Router) {}
  public irAProductos() {
    this.router.navigate(['productos']);
  }
}
