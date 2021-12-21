import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { SignupComponent } from '../login/signup/signup.component';
import { SigninComponent } from '../login/signin/signin.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  localStorage: Storage = localStorage;
  bsModalRef?: BsModalRef;

  constructor(
    public authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openSigninModal(): void {
    this.bsModalRef = this.modalService.show(SigninComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openSignupModal(): void {
    this.bsModalRef = this.modalService.show(SignupComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
