import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSkillsComponent } from './crear-skills.component';

describe('CrearSkillsComponent', () => {
  let component: CrearSkillsComponent;
  let fixture: ComponentFixture<CrearSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
