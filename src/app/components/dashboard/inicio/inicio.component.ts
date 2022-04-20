import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogoComponent } from './dialogo/dialogo.component';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
  	//Pasamos nuestro componente del contenido que queremos pasar al modal
    const dialogRef = this.dialog.open(DialogoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

  ngOnInit(): void {
  }

}
