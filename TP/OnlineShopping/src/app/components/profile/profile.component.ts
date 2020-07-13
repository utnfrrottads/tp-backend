import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresa } from '../../model/empresas';
import { Persona } from '../../model/personas';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private router:Router) {}

  user: any = {
    esPersona: true, //false si es empresa.
    entidad: undefined,
  };

  ngOnInit(): void {
    let persona = new Persona();
    persona.direccion = 'mitre 717';
    persona.dni = 444564;
    persona.localidad = 'Corral de bustos';
    persona.mail = 'robertodelapatria@hotmail.com';
    persona.telefono = '03468 505050';
    persona.id = 2020;
    persona.nombre = 'Kurt';
    persona.apellido = 'Cobain';

    let empresa = new Empresa();
    empresa.cuit = '22222222222';
    empresa.direccion = 'san juan 678';
    empresa.razonSocial = 'Branca Menta';
    empresa.id = 2020;
    empresa.localidad = 'Rosario';
    empresa.mail = 'asd@hotmail.com';
    empresa.telefono = '034687 5050550';

    this.user.entidad = persona;

    if (this.user.entidad instanceof Persona) {
      this.user.esPersona = true;
    } else {
      this.user.esPersona = false;
    }
  }
  save(form) {
    // se fija si algun campo está vacio.
    let inputs = form.elements;
    let c = 0;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].nodeName === 'INPUT' && inputs[i].type === 'text') {
        if (inputs[i].value.trim() === '') {
          c++;
        }
      }
    }
    if (c > 0) {
      this.openSnackBar('Complete todos los campos', '¡Entendido!');
      return;
    }

    // se fija si el mail es valido.
    let claseMail = document.getElementById('mail').className;
    if (claseMail !== 'validate valid') {
      this.openSnackBar('Direccion de correo no valida', '¡Entendido!');
      return;
    }

    //actualiza los valores
    if (this.user.esPersona) {
      this.user.entidad.nombre = (<HTMLInputElement>(
        document.getElementById('nombre')
      )).value;
      this.user.entidad.apellido = (<HTMLInputElement>(
        document.getElementById('apellido')
      )).value;
      this.user.entidad.mail = (<HTMLInputElement>(
        document.getElementById('mail')
      )).value;
      this.user.entidad.dni = (<HTMLInputElement>(
        document.getElementById('dni')
      )).value;
      this.user.entidad.localidad = (<HTMLInputElement>(
        document.getElementById('localidad')
      )).value;
      this.user.entidad.direccion = (<HTMLInputElement>(
        document.getElementById('direccion')
      )).value;
      this.user.entidad.telefono = (<HTMLInputElement>(
        document.getElementById('telefono')
      )).value;
    } else {
      this.user.entidad.razonSocial = (<HTMLInputElement>(
        document.getElementById('razonSocial')
      )).value;
      this.user.entidad.cuit = (<HTMLInputElement>(
        document.getElementById('cuit')
      )).value;
      this.user.entidad.telefono = (<HTMLInputElement>(
        document.getElementById('telefono')
      )).value;
      this.user.entidad.localidad = (<HTMLInputElement>(
        document.getElementById('localidad')
      )).value;
      this.user.entidad.direccion = (<HTMLInputElement>(
        document.getElementById('direccion')
      )).value;
      this.user.entidad.mail = (<HTMLInputElement>(
        document.getElementById('mail')
      )).value;
      this.openSnackBar('Se ha modificado con éxito', '¡Entendido!');
      
    }

    //deja en blanco las casillas
    this.discard(form);
  }
  discard(form) {
    //agarro todos los inputs de la form y los vacio.
    let inputs = form.elements;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].nodeName === 'INPUT' && inputs[i].type === 'text') {
        inputs[i].value = '';
      }
    }
    //me traigo el mail y tambien lo reseteo.input
    (<HTMLInputElement>document.getElementById('mail')).value = ' ';
    (<HTMLInputElement>document.getElementById('mail')).className = 'validate';
  }

  openSnackBar(message: string, action: string) {
    //metodo para que aparezca en pantalla un snack para informar al usuario.
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
