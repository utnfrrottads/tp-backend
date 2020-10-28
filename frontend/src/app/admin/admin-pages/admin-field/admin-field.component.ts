import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from 'src/app/models/field.model';
import { User } from 'src/app/models/user.model';
import { FieldService } from 'src/app/services/field.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-field',
  templateUrl: './admin-field.component.html',
  styleUrls: ['./admin-field.component.css']
})
export class FieldComponent implements OnInit {

  fieldForm : FormGroup;
  file: File
  user: User
  fileTemporal : any  = null;
  hourOK: boolean = true;
  field : Field
  editForm : boolean = false
  fieldID : string = ''
  isImage: boolean = false;

  constructor(private fb : FormBuilder,
              private uploadFileService: UploadFileService,
              private fieldService: FieldService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.createFieldForm();
    this.user = this.userService.user
    this.editMode()
    this.listenerForm();
   }

  ngOnInit(): void {
  }
  createFieldForm(){
    this.fieldForm = this.fb.group({
      name: ['',[Validators.required]],
      cantMaxPlayers: ['',[Validators.required]],
      price: ['',[Validators.required]],
      openingHour: ['',[Validators.required]],
      closingHour: ['',[Validators.required]],
      description: ['',[Validators.required, Validators.maxLength(200)]],
    })
  }
  
  getInputValid(input : string){
    return this.fieldForm.get(input).invalid &&
            this.fieldForm.get(input).touched
  }
  submitField(){
    if (this.fieldForm.invalid){
      Object.values(this.fieldForm.controls).forEach(control=>{
        control.markAsTouched();
      })
      return;
    }
    if(this.editForm === true){
      this.editField()
    }
    else if(this.editForm === false){
      this.createField()
    }
  }
    
  changeImage(file:File){
    this.file = file
    if(!file){
      return this.fileTemporal = null;
    }
    const reader = new FileReader();
    const url64= reader.readAsDataURL(file);
    reader.onloadend = () =>{
      this.fileTemporal = reader.result;
    }
  }
  listenerForm(){
    this.fieldForm.valueChanges
               .subscribe(data=>{
                 const open = parseInt((data.openingHour).split(':').join(''));
                 const close = parseInt((data.closingHour).split(':').join(''));
                 if(open>=close){
                  this.hourOK = false;
                 }
                 else{
                   this.hourOK= true;
                 }                 
               })
  }

  editMode(){
    this.fieldID = this.activatedRoute.snapshot.params.id
    if(this.fieldID !== undefined){
      this.editForm = true
      this.fieldService.getField(this.fieldID)
                        .subscribe(resp=>{
                            this.field = resp;
                            this.fillEditMode()
                          })
      }
  }

  fillEditMode(){
    const opening = this.getHour(this.field.openingHour)
    const closing = this.getHour(this.field.closingHour)
    this.fieldForm.patchValue({
      name: this.field.name,
      cantMaxPlayers: this.field.cantMaxPlayers,
      price: this.field.price,
      openingHour: opening,
      closingHour: closing,
      description: this.field.description,
    })
    if(this.field.hasOwnProperty('image')){
      this.isImage = true
    }
    else{
      this.isImage=false
    }
    //this.fileTemporal = this.field.image
  }
  
  getHour(date){
    return date.slice(11,16)
  }

  createField(){
    this.fieldService.createField(this.fieldForm.value,this.user.uid)
          .subscribe((resp:any)=>{
            if(this.file){
              this.uploadFileService.uploadImage(this.file,'field',resp.field.id)
                                     .then(data=>{
                                      Swal.fire({
                                        title: 'Cancha creada',
                                        icon: "success",
                                        timer: 2000,
                                        showConfirmButton:false,
                                        allowOutsideClick: false
                                      });
                                      setTimeout(() => {
                                        this.router.navigateByUrl('/admin/fields')
                                      }, 2000);
                                    },(err)=>{
                                      console.log(err)
                                      Swal.fire('Error al subir la foto','Por favor, intentelo nuevamente','error')
                                    })           
            }
          Swal.fire({
            title: 'Cancha creada',
            icon: "success",
            timer: 2000,
            showConfirmButton:false,
            allowOutsideClick: false
          });
          setTimeout(() => {
            this.router.navigateByUrl('/admin/fields')
          }, 2000);                     
          },(err)=>{
            console.log(err)
            Swal.fire('Error al crear la cancha','Por favor, intentelo nuevamente o cambie los datos','error')
          })
  }

  editField(){
    this.fieldService.updateField(this.fieldID,this.fieldForm.value)
          .subscribe((resp:any)=>{
            if(this.file){
              this.uploadFileService.uploadImage(this.file,'field',this.fieldID)
                                     .then(data=>{
                                      Swal.fire({
                                        title: 'Cancha editada',
                                        icon: "success",
                                        timer: 2000,
                                        showConfirmButton:false,
                                        allowOutsideClick: false
                                      });
                                      setTimeout(() => {
                                        this.router.navigateByUrl('/admin/fields')
                                      }, 2000);
                                    },(err)=>{
                                      console.log(err)
                                      Swal.fire('Error al subir la foto','Por favor, intentelo nuevamente','error')
                                    })           
            }
          Swal.fire({
            title: 'Cancha editada',
            icon: "success",
            timer: 2000,
            showConfirmButton:false,
            allowOutsideClick: false
          });
          setTimeout(() => {
            this.router.navigateByUrl('/admin/fields')
          }, 2000);                     
          },(err)=>{
            console.log(err)
            Swal.fire('Error al editar la cancha','Por favor, intentelo nuevamente o cambie los datos','error')
          })
  }
}
