import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menu: Menu[] = [];
  nombreUsuario='';
  roles: Array<string> = [];
  isAdmin= false;
  rol2: any;
  constructor(private _menuService: MenuService,private auth: AuthService) { }

  ngOnInit(): void {
    this.cargarMenu();
    this.user()
  }

  cargarMenu() {
    this._menuService.getMenu().subscribe(data => {
      //console.log(data);
      this.menu = data;
    })
  }

  user() {
    this.nombreUsuario=this.auth.UsuarioAutenticado.nombreUsuario;
    
  }
  public logOut(): void {
    window.sessionStorage.clear();
  }

  rol():string[] {
    
  this.roles =[];
    this.roles=this.auth.UsuarioAutenticado.authorities;
    // let rol1 = this.roles [0]
    // let rol2 = this.roles [1]
 
  console.log(JSON.stringify(this.roles))
   
       
  
    return this.roles
    
    
    
  }
}
