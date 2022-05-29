import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Skills } from 'src/app/interfaces/skills';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-editar-skills',
  templateUrl: './editar-skills.component.html',
  styleUrls: ['./editar-skills.component.css']
})
export class EditarSkillsComponent implements OnInit {
  form: FormGroup;
  @Input() skills?: Skills ;

  constructor(private fb: FormBuilder, private _skillsService: SkillsService,
     private _snackBar: MatSnackBar, 
     private router: Router,
     private route: ActivatedRoute) { 
    
    
    this.form = this.fb.group({
    nombre_habilidad: [''],
    valor: [''],
    tipo: [''],
  });}

  ngOnInit(): void {this.cargaSkills();

  }

  editarSkills() {


  
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this._skillsService.updateSkills(id ,this.form.value)
    .subscribe((data) => {
      
      this._snackBar.open(
        'Se Actualizado esta Habilidad',
        'Habilidad Actualizada',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
       //this.form.reset();
      this.router.navigate(['/inicio']);
    });
   
  }

    cargaSkills() {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  
      this._skillsService.getSkillsDetalle(id).subscribe((data) => {
        this.skills = data;
  
        this.form.setValue({
          nombre_habilidad: this.skills?.nombre_habilidad,
          valor: this.skills?.valor,
          tipo: this.skills?.tipo,
          
        });
      });
    }

    redir() {
      this.form.reset();
      this.router.navigate(['/inicio']);
    }
  }


