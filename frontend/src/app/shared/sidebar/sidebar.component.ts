import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
  }

  logout(){
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#CBDCD8',
      confirmButtonText: 'Cerrar sesión'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Cerrando sesión',
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          this.userService.logOut();
          this.router.navigateByUrl('/admin/login');
        }, 2000);
        }

    });
  }
}
