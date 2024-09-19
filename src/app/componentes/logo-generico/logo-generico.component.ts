import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-generico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-generico.component.html',
  styleUrl: './logo-generico.component.less',
})
export class LogoGenericoComponent {
  @Input() texto: string = '';
}
