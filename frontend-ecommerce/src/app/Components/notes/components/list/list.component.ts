import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../../../Services/note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListNoteComponent implements OnInit {

  items: any = [];

  constructor(
    private noteService: NoteService,
    private router: Router,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.noteService.getAll().subscribe(x => {
      this.items = x;
    });
  }
  addNote() {
    this.router.navigate(['/edit-note']);
  }

  editNote(item: any) {
    this.router.navigate(['/edit-note', item._id ]);
  }

  deleteNote(item: any) {
    this.noteService.deleteNote(item._id).subscribe(x => {
      this.toastr.success('Nota eliminada');
      this.updateList();
    });

  }
}
