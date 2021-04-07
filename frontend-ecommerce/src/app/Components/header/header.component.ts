import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/role';
import { Sale } from 'src/app/Models/sale';
import { User } from 'src/app/Models/user';
import { RoleService } from 'src/app/Services/role.service';
import { SaleService } from 'src/app/Services/sale.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  @Input() searchBar = false
  @Output() searchActive = new EventEmitter<string>()

  public href: string= ""
  public currentUser: User 
  public currentUserRole: Array<Role> = [new Role()]
  public permissions: Array<string> = [""]


  constructor(private router: Router, private userService: UserService, private roleService: RoleService, private saleService: SaleService) { 
    this.href= this.router.url;
    var string = localStorage.getItem('CurrentUser') || JSON.stringify(new User());
    this.currentUser = JSON.parse(string)
    if(this.currentUser.employee){
      this.currentUser.roles.forEach(role => {
        this.roleService.getById(role).subscribe(res =>{
          this.mapRoles(res as Role)
        })
      }); 
    }
  }

  ngOnInit(): void {
  }

  onSearch(text: string){
    this.searchActive.emit(text)
  }

  onTxtBoxChanged(text: string){
    if(text.length==0){
      this.searchActive.emit('')
    }
  }

  mapRoles(role:Role){
    role.permissions.forEach(permission => {
      if(this.permissions.indexOf(permission) == -1){
        this.permissions.push(permission)
      }
    });
  }

  logoutUser(){
    this.currentUser = new User()
    this.userService.logoutUser()
    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })
  }

  createSale(){
    var sale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({}))) 
    if(sale.client == ""){
      var user = localStorage.getItem("CurrentUser") || JSON.stringify(new User())
      var currentUser = JSON.parse(user) 
      
      var transactionNumber = 0
      this.saleService.getNextTransNumber().subscribe(res => {
        transactionNumber = res as number
      })
      
      var param = 
      {
        'client': currentUser._id,
        'transactionNumber': transactionNumber,
        'cart':[]
      }
      
      var currentSale = new Sale(param)
      localStorage.setItem("CurrentSale", JSON.stringify(currentSale))
    }
      
    this.router.navigate(['/market'])
  }

}
