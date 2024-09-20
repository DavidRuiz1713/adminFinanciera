import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../../core/servicios/productos.service';
import { NotificacionComponent } from '../notificacion/notificacion.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NotificacionComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.less',
})
export class ModalComponent {
  //Inyectamos el servicio
  private productosService = inject(ProductosService);
  modalVisible: boolean = false;
  // Datos obtenidos de cada producto
  @Input() id: string = '';
  public errorMessage: string = '';
  public modalErrorVisible: boolean = false;

  ngOnInit() {
    // Suscripción para los errores del servicio
    this.productosService.error$.subscribe((error) => {
      if (error) {
        this.errorMessage = error;
      }
    });
  }
  mostrarModal() {
    this.modalVisible = true;
  }
  ocultarModal() {
    this.modalVisible = false;
    this.productosService.limpiarMensaje();
  }
  eliminarProducto() {
    this.productosService.eliminarProducto(this.id).subscribe((response) => {
      this.modalVisible = false;
    });
  }
}
