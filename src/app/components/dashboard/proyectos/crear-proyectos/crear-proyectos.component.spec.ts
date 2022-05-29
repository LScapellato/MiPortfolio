import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProyectosComponent } from './crear-proyectos.component';

describe('CrearProyectosComponent', () => {
  let component: CrearProyectosComponent;
  let fixture: ComponentFixture<CrearProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
