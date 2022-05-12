import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEstudioComponent } from './crear-estudio.component';

describe('CrearEstudioComponent', () => {
  let component: CrearEstudioComponent;
  let fixture: ComponentFixture<CrearEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEstudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
