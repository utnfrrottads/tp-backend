import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FieldService } from 'src/app/services/field.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fields',
  templateUrl: './admin-fields.component.html',
  styleUrls: ['./admin-fields.component.css']
})
export class FieldsComponent implements OnInit {
  
  fields = [];
  param :string;
  query : string = "";
  empty : boolean = true;
  user : User
  searchInput: any

  constructor(private fieldService : FieldService,
              private userService: UserService,
              private router : Router,
              private activatedRoute: ActivatedRoute) {
                this.user = this.userService.user
                this.activatedRoute.queryParams.subscribe(param =>{
                  this.query = param['search'] || ''
                  this.getFields()
                 })
                this.getFields()
              }

  ngOnInit(): void {
    
  }

  getFields(){
    if(this.query === ''){
      this.param = 'Todas'
    }else{
      this.param = this.query
    }
    this.fieldService.getFieldsByCenterAdmin(this.query, this.user.uid)
                          .subscribe((resp: any)=>{
                            this.fields = resp;
                            if(this.fields.length ===0){
                              this.empty = true
                            }else{
                              this.empty = false;
                            } 
                          },err=>{
                            console.log(err)
                            Swal.fire("Error","Intentar nuevamente...",'error')
                          })
    
   }
   searchField(text : string){
    this.router.navigate(['/admin/fields'],{queryParams:{'search': text},
                                      replaceUrl:true,
                                      queryParamsHandling:'merge'});
  }
}
