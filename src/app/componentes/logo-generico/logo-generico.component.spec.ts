import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoGenericoComponent } from './logo-generico.component';

describe('LogoGenericoComponent', () => {
  let component: LogoGenericoComponent;
  let fixture: ComponentFixture<LogoGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoGenericoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
