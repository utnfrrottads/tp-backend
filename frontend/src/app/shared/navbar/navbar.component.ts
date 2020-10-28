import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#FAE804',
      confirmButtonText: 'Cerrar sesión'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Cerrando sesión',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton:false,
          timer:2000
        });
        setTimeout(() => {
          this.userService.logOut();
          this.router.navigateByUrl('/login')
        }, 2000);
        }

    })
  }

}
