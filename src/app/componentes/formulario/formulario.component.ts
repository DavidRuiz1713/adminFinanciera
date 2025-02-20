import { Component, inject } from '@angular/core';
import { ProductosService } from '../../core/servicios/productos.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatosSeleccionadosService } from '../../core/servicios/datos-seleccionados.service';
import { Router } from '@angular/router';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { consultarProductoValidator } from './validaciones';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificacionComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.less',
})
export class FormularioComponent {
  //Inyectamos el servicio
  private productosService = inject(ProductosService);
  public txtBoton: string = '';
  public productoEditar: any = {};
  public productoExiste: boolean | null = null;
  public errorMessage: string | null = null;

  get id() {
    return this.formularioProducto.get('id') as FormControl;
  }
  get name() {
    return this.formularioProducto.get('name') as FormControl;
  }
  get description() {
    return this.formularioProducto.get('description') as FormControl;
  }
  get logo() {
    return this.formularioProducto.get('logo') as FormControl;
  }
  get date_release() {
    return this.formularioProducto.get('date_release') as FormControl;
  }

  get date_revision() {
    return this.formularioProducto.get('date_revision') as FormControl;
  }

  formularioProducto = new FormGroup({
    id: new FormControl(
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      [consultarProductoValidator(this.productosService)], // Validador asíncrono
    ),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl('', [Validators.required]),
    date_revision: new FormControl('', [Validators.required]),
  });

  constructor(
    private datosSeleccionadosService: DatosSeleccionadosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.date_revision.disable();
    // Escuchar cambios en date_release y actualizar date_revision
    this.date_release.valueChanges.subscribe((value) => {
      if (value) {
        const fechaRelease = new Date(value);
        const fechaRevision = new Date(fechaRelease);
        fechaRevision.setFullYear(fechaRevision.getFullYear() + 1);
        this.date_revision.setValue(
          fechaRevision.toISOString().substring(0, 10),
        );
      }
    });

    // Suscribirse a los errores del servicio
    this.productosService.error$.subscribe((error) => {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        this.errorMessage = (error as { message: string }).message;
      } else if (typeof error === 'string') {
        this.errorMessage = error;
      } else {
        this.errorMessage = 'Error desconocido';
      }
    });

    this.productoEditar = this.datosSeleccionadosService.getProducto();
    if (this.productoEditar != undefined) {
      this.id.disable();
      this.txtBoton = 'Editar';
      // Formatear la fecha para mostrar solo la parte de la fecha
      this.productoEditar.date_release =
        this.productoEditar.date_release.split('T')[0];
      this.productoEditar.date_revision =
        this.productoEditar.date_revision.split('T')[0];
      this.formularioProducto.patchValue(this.productoEditar);
    } else {
      this.txtBoton = 'Agregar';
    }
  }

  agregarProducto(accion: string): void {
    let procedimiento = accion;
    if (procedimiento === 'Agregar') {
      this.date_revision.enable();
      const nuevoProducto = this.formularioProducto.value;
      this.productosService
        .agregarProducto(nuevoProducto)
        .subscribe((response) => {
          this.router.navigate(['']);
        });
    } else {
      this.id.enable();
      this.date_revision.enable();
      const productoEditado = this.formularioProducto.value;
      this.productosService
        .editarProducto(productoEditado)
        .subscribe((response) => {
          this.router.navigate(['']);
        });
    }
  }

  async consultarProducto(id: string) {
    this.productosService.consultarIdProducto(id).subscribe({
      next: (existe: boolean) => {
        this.productoExiste = existe;
        console.log('verificar el producto:', this.productoExiste);
      },
      error: (err) => {
        console.error('Error al verificar el producto:', err);
        this.productoExiste = null; // Si ocurre un error, puedes manejarlo aquí
      },
    });
  }

  borrarFormulario(accion: string): void {
    if (accion === 'Editar') {
      this.formularioProducto.patchValue({
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      });
    } else {
      this.formularioProducto.reset();
    }
    this.errorMessage = null;
  }

  hasChanges() {
    return this.formularioProducto.pristine;
  }
}
