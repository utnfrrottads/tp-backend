import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { SignupComponent } from '../login/signup/signup.component';
import { SigninComponent } from '../login/signin/signin.component';
import { Notificacion } from 'src/app/models/Notificacion';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  numeroNotificacionesNoLeidas: number = 0;
  notificaciones: Notificacion[] = [];
  localStorage: Storage = localStorage;
  bsModalRef?: BsModalRef;

  misNotificacionesQuery: any;
  misNotificacionesSubscription: any;

  constructor(
    private router: Router,
    public authService: AuthService,
    private notificacionService: NotificacionService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.authService.setSearchNotifications(this.suscribeMisNotificaciones.bind(this));
    if (this.authService.loggedIn()) {
      this.suscribeMisNotificaciones();
    }
  }

  ngOnDestroy(): void {
    if (this.misNotificacionesSubscription) this.unsuscribeMisNotificaciones();
  }

  suscribeMisNotificaciones(): void {
    this.misNotificacionesQuery = this.notificacionService.misNotificaciones();
    this.misNotificacionesSubscription = this.misNotificacionesQuery.valueChanges.pipe(
      map((res: any) => {
        return res.data.misNotificaciones;
      })
    ).subscribe(
      (res: any) => {
        this.notificaciones = [];
        this.numeroNotificacionesNoLeidas = 0;

        res.forEach((element: any) => {
          let notificacion: Notificacion = {
            _id: element._id,
            descripcion: element.descripcion,
            link: element.link,
            fechaHora: new Date(element.fechaHora),
            leida: element.leida,
            abierta: element.abierta,
            icono: element.icono,
          }
          this.notificaciones.push(notificacion);

          if (!notificacion.leida) {
            this.numeroNotificacionesNoLeidas++;
          }
        });
      },
      (err: any) => console.log(err)
    );
  }

  refreshMisNotificaciones(): void {
    this.misNotificacionesQuery.refetch();
  }

  unsuscribeMisNotificaciones(): void {
    this.misNotificacionesSubscription.unsubscribe();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.numeroNotificacionesNoLeidas = 0;
    this.notificaciones = [];
    this.unsuscribeMisNotificaciones();
  }

  openSigninModal(): void {
    this.bsModalRef = this.modalService.show(SigninComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openSignupModal(): void {
    this.bsModalRef = this.modalService.show(SignupComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  leerNotificaciones(): void {
    this.numeroNotificacionesNoLeidas = 0;
    this.notificaciones.forEach(notificacion => {
      notificacion.leida = true;
    });

    this.notificacionService.leerNotificaciones().subscribe(
      (res: any) => { },
      (err: any) => { }
    );
  }

  irALaNotificacion(notificacion: Notificacion): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/' + notificacion.link]);
    });
  }
}
