import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})
export class ListaEmpresasComponent implements OnInit {
  empresas:any = []; 
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getEmpresas().subscribe((res) => { 
      this.empresas = res;
    })
  }

}
/*
  [{ 
    id: 123,
    cuit: 'Under Armour',
    razonSocial: 'asdasd',
    localidad: 'SG',
    direccion: 'asdasd 1234',
    telefono: '213123123',
    mail: 'asdasd@mail.com',
    img: "https://image.flaticon.com/icons/svg/806/806022.svg"
  },
  { 
    id: 123,
    cuit: 'Under Armour',
    razonSocial: 'asdasd',
    localidad: 'SG',
    direccion: 'asdasd 1234',
    telefono: '213123123',
    mail: 'asdasd@mail.com',
    img: "https://image.flaticon.com/icons/svg/732/732084.svg"
  },
  { 
    id: 123,
    cuit: 'Under Armour',
    razonSocial: 'asdasd',
    localidad: 'SG',
    direccion: 'asdasd 1234',
    telefono: '213123123',
    mail: 'asdasd@mail.com',
    img: "https://image.flaticon.com/icons/svg/882/882722.svg"
  },
  { 
    id: 123,
    cuit: 'Under Armour',
    razonSocial: 'asdasd',
    localidad: 'SG',
    direccion: 'asdasd 1234',
    telefono: '213123123',
    mail: 'asdasd@mail.com',
    img: "https://image.flaticon.com/icons/svg/882/882738.svg"
  },
  { 
    id: 123,
    cuit: 'Under Armour',
    razonSocial: 'asdasd',
    localidad: 'SG',
    direccion: 'asdasd 1234',
    telefono: '213123123',
    mail: 'asdasd@mail.com',
    img: "https://image.flaticon.com/icons/svg/888/888841.svg"
  },
  { 
    id: 123,
    cuit: 'Under Armour',
    razonSocial: 'asdasd',
    localidad: 'SG',
    direccion: 'asdasd 1234',
    telefono: '213123123',
    mail: 'asdasd@mail.com',
    img: "https://image.flaticon.com/icons/svg/731/731962.svg"
  }
]
*/ 
