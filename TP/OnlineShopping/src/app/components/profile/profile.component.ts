import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../model/empresas';
import { Persona } from '../../model/personas';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  user:any = {
    esPersona: true, //false si es empresa.
    entidad: undefined,
  }

  ngOnInit(): void {
    let persona = new Persona();
    persona.direccion = "mitre 717";
    persona.dni = 444564;
    persona.localidad = "Corral de bustos";
    persona.mail = "robertodelapatria@hotmail.com";
    persona.telefono = "03468 505050";
    persona.id = 2020;
    persona.nombre = "Kurt";
    persona.apellido = "Cobain";

    let empresa = new Empresa();
    empresa.cuit = "22222222222";
    empresa.direccion = "san juan 678";
    empresa.razonSocial = "Branca Menta";
    empresa.id = 2020;
    empresa.localidad = "Mitre 717";
    empresa.mail = "asd@hotmail.com";
    empresa.telefono = "034687 5050550";

    this.user.entidad = persona;

    if(this.user.entidad instanceof Persona){
      this.user.esPersona = true;
    }
    else{
      this.user.esPersona = false;
    }
  }

  save(){
    console.log("asd");
  }

}
