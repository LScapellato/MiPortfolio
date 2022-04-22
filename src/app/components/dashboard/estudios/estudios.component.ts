import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent {
  estudios= [
    'Estudio 1',
    'Estudio 2',
    'Estudio 3',
    'Estudio 4',
    'Estudio 5',
    'Estudio 6',
    'Estudio 7',
  ];


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.estudios, event.previousIndex, event.currentIndex);
  }
}
