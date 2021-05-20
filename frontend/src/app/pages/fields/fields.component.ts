import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { FieldService } from 'src/app/services/field.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  fields = [];
  param: string;
  query = '';
  empty = true;
  user: User;

  constructor(private fieldService: FieldService,
              private activatedRoute: ActivatedRoute) {
              }

   ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe((param: {search: string}) => {
        this.query = param.search || '';
        this.getFields();
       });
    }

    getFields(){
      if (this.query === ''){
        this.param = 'Todas';
      }else{
        this.param = this.query;
      }

      this.fieldService.getFields(this.query)
                            .subscribe((resp: any) => {
                              this.fields = resp;
                              if (this.fields.length === 0){
                                this.empty = true;
                              }else{
                                this.empty = false;
                              }
                            }, err => {
                              console.log(err);
                              Swal.fire('Error', 'Intentar nuevamente...', 'error');
                            });
     }
}
