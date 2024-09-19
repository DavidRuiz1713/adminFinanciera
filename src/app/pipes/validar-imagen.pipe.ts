import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validarImagen',
  standalone: true,
})
export class ValidarImagenPipe implements PipeTransform {
  transform(value: string): boolean {
    // Si la URL es válida, la regresamos, si no, ponemos una imagen por defecto
    const img = new Image();
    img.src = value;

    return img.complete && img.naturalHeight !== 0;
    // ? value
    // : '../../../assets/iconos/circulo_gris.png';
  }
}
