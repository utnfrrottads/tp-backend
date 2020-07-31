import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/model/rubros';
import { Producto } from 'src/app/model/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
declare const M: any;

@Component({
  selector: 'app-subir-producto',
  templateUrl: './subir-producto.component.html',
  styleUrls: ['./subir-producto.component.scss']
})
export class SubirProductoComponent implements OnInit {
  rubros:Rubro[];
  producto = new Producto();
  idRubroSeleccionado:any;
  constructor(private _snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    M.updateTextFields();

    this.rubros = [
      {idRubro:1,descripcion:"Tecnologia"}, 
      {idRubro:2,descripcion:"Alimentos"},
      {idRubro:3,descripcion:"Ropa e Indumentaria"},
      {idRubro:4,descripcion:"Vehículos"},
      {idRubro:5, descripcion:"Escolar"}
    ];
  }

  obtenerIdRubro(idRubro){
    //cargo el valor del idRubro
    this.idRubroSeleccionado= idRubro;
  }

  checkNumber(){
    //checkeo si el stock es un número; sino pongo el campo en rojo
    if(isNaN(parseInt((<HTMLInputElement>(
          document.getElementById('stock')
        )).value))){
          (<HTMLInputElement>(document.getElementById('stock'))).className += " invalid";
    }

  }

    save(form) {
      // se fija si algun campo está vacio.
      let inputs = form.elements;
      let c = 0;
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName === 'INPUT' && inputs[i].type === 'text') {
          if (inputs[i].value.trim() === '') {
            inputs[i].className += " invalid";
            c++;
          }
        }
      }
      if (c > 0) {
        //resalto el input de rubro
        if (isNaN(this.idRubroSeleccionado)){
          (<HTMLInputElement>(document.getElementById('rubro'))).className += " invalidInput";
        } else {
          //si está en rojo, le saco la clase invalidInput al input rubro
          (<HTMLInputElement>(document.getElementById('rubro'))).classList.remove("invalidInput");
        }
        this.openSnackBar('Complete los campos resaltados en rojo', '¡Entendido!');
        return;
      }
      
        else{
        
          //checkeo que el stock sea un numero
        if(!isNaN(parseInt((<HTMLInputElement>(
          document.getElementById('stock')
        )).value))){
          
          //checkeo si se selecciono algo del combo
          if(!isNaN(this.idRubroSeleccionado))
          {
              //cargo los valores del producto
            //valor nombre
            this.producto.nombre = (<HTMLInputElement>(document.getElementById('nombreProducto'))).value;
            
            //valor descripcion
            this.producto.descripcion = (<HTMLInputElement>(document.getElementById('descripcionProducto'))).value;
            //valor stock
            this.producto.stock = parseInt((<HTMLInputElement>(document.getElementById('stock'))).value);
            //valor idRubro
            this.producto.idRubro = this.idRubroSeleccionado;


            /*
              FALTA CARGAR EL ID DE LA EMPRESA
            */


            //avisa
            this.openSnackBar('Guardado con exito', '¡Entendido!');
          }
          else {
            (<HTMLInputElement>(document.getElementById('rubro'))).className += " invalidInput";

            this.openSnackBar('Es necesario seleccionar un rubro', '¡Entendido!')
        }
      }
        else {
          (<HTMLInputElement>(document.getElementById('stock'))).className += " invalid";
          
          this.openSnackBar('El valor del stock debe ser un numero', '¡Entendido!');
        }
      }
    }

  
    openSnackBar(message: string, action: string) {
      //metodo para que aparezca en pantalla un snack para informar al usuario.
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

  

  


}