import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  constructor(private router : Router,
              private userService : UserService,
              private activatedRoute: ActivatedRoute) { }


  searchField(text : string){
    this.router.navigate(['/fields'],{queryParams:{'search': text},
                                      replaceUrl:true,
                                      queryParamsHandling:'merge'});
  }
  logOut(){
    this.userService.logOut();
  }

}
