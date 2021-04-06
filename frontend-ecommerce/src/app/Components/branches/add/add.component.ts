import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../../Services/branch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-branches',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddBranchComponent implements OnInit{
  branchForm: FormGroup;
  sendFormData: any;

  isEdit = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private branchService: BranchService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.branchForm = this.fb.group({
      id: [''],
      cuit: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      pc: ['', Validators.required],
      phone: ['' , Validators.required]});
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.branchService.getById(params.get('id')).subscribe(branch => {
        this.isEdit = true;
        this.branchForm.patchValue({
          id: branch._id,
          cuit: branch.cuit,
          street: branch.street,
          number: branch.number,
          pc: branch.pc,
          phone: branch.phone

        });
      });
    });
  }

  onSubmit() {
    const formModel = this.branchForm.value;

    if (this.branchForm.valid) {

      const branch: any = {
        _id: formModel.id,
        cuit: formModel.cuit,
        street: formModel.street,
        number: formModel.number,
        pc: formModel.pc,
        phone: formModel.phone
      };

      if (this.isEdit){
        this.branchService.updateBranch(branch).subscribe(x => {
          this.toastr.success('Sucursal actualizada exitosamente!');
          this.goBack();
        });
      }
      else {
        this.branchService.addBranch(branch).subscribe(x => {
          this.toastr.success('Sucursal registrada exitosamente!');
          this.goBack();
          });
        }

    }
    else{
      this.toastr.error('Error al registrar la sucursal!');
    }
  }

  goBack() {
    this.router.navigate(['/branches']);
  }

}
