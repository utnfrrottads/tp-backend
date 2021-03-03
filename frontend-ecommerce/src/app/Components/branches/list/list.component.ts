import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../../../Services/branch.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-branches',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BranchesComponent implements OnInit {

  items: any = [];

  constructor(
    private branchService: BranchService,
    private router: Router,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.branchService.getAll().subscribe(x => {
      this.items = x;
    });
  }
  addBranch() {
    this.router.navigate(['/add-branch']);
  }

  editBranch(item: any) {
    this.router.navigate(['/edit-branch', item._id ]);
  }

  deleteBranch(item: any) {
    this.branchService.deleteBranch(item._id).subscribe(x => {
      this.toastr.success('Sucursal eliminada');
      this.updateList();
    });

  }
}