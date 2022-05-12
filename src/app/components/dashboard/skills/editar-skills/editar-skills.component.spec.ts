import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSkillsComponent } from './editar-skills.component';

describe('EditarSkillsComponent', () => {
  let component: EditarSkillsComponent;
  let fixture: ComponentFixture<EditarSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
