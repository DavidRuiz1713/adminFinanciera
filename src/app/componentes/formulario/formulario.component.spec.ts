import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { HttpClientModule } from '@angular/common/http';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar los valores de los atributos como vacío', () => {
    expect(component.formularioProducto).toBeDefined();
    expect(component.formularioProducto.value).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
    });
    expect(component.txtBoton).toBe('Agregar');
  });
  it('Debe aumentar un año date_revision a partir de date_release', () => {
    component.date_release.setValue('2024-01-01');
    fixture.detectChanges();
    expect(component.date_revision.value).toBe('2025-01-01');
  });
});
