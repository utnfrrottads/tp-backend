import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  constructor(private router : Router,
              private userService : UserService) { }

  //ACA OBTENER EL ID DEL USUARIO LOGUEADO
  id = 123

  searchField(text : string){
    this.router.navigate(['/fields',text])
  }
  logOut(){
    this.userService.logOut();
  }

}
