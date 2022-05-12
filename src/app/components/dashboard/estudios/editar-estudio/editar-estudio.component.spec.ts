import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudioComponent } from './editar-estudio.component';

describe('EditarEstudioComponent', () => {
  let component: EditarEstudioComponent;
  let fixture: ComponentFixture<EditarEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
