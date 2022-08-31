import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../../../Services/note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddNoteComponent implements OnInit{
  noteForm: FormGroup;
  sendFormData: any;

  isEdit = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private noteService: NoteService,
    private toastr: ToastrService,
    private route: ActivatedRoute

  ) {
    this.noteForm = this.fb.group({
      id: [''],
      name: ['', Validators.required] });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.noteService.getById(params.get('id')).subscribe(note => {
        this.isEdit = true;
        this.noteForm.patchValue({
          id: note._id,
          name: note.name
        });
      });
    });
  }

  onSubmit() {
    const formModel = this.noteForm.value;

    if (this.noteForm.valid) {

      const note: any = {
        _id: formModel.id,
        name: formModel.name,
      };

      if (this.isEdit){
        this.noteService.updateNote(note).subscribe({
          next: x => {
            this.toastr.success('Nota actualizada exitosamente!');
            this.goBack();
          },
          error: e => {
            this.toastr.error(e.error.error);
          }
      });
      }
      else {
          this.noteService.addNote(note).subscribe({
            next: x => {
              this.toastr.success('Nota registrada exitosamente!');
              this.goBack();
            },
            error: e => {
              this.toastr.error(e.error.error);
            }
        });
        }

    }
    else{
      this.toastr.error('Debe completar todos los campos!');
    }
  }

  goBack() {
    this.router.navigate(['/notes']);
  }

}
