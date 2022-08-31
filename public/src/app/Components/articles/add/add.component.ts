import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../Services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/Models/note';
import { NoteService } from '../../../Services/note.service';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddArticleComponent implements OnInit{
  @Output() getError = new EventEmitter<string>()
  articleForm: FormGroup;
  sendFormData: any;
  notes =[new Note()];

  isEdit = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private articleService: ArticleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private notesService: NoteService
  ) {
    this.articleForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      presentation: ['', Validators.required],
      notes: ['',Validators.required],
      price: ['', Validators.required],
      date: ['' , Validators.required]});
  }

  ngOnInit() {

    this.getNotes();

    this.route.paramMap.subscribe(params => {

      if (params.get('id')){
        this.articleService.getByIdArticles(params.get('id')).subscribe(article => {
          this.isEdit = true;
          let date =   new Date(article.prices[0].date).toISOString().split('T')[0]
          this.articleForm.patchValue({
            id: article._id,
            name: article.name,
            description: article.description,
            presentation: article.presentation,
            notes: article.notes,
            price: article.prices[0].price,
            date: date
          });
        }); 
      }

    });
      
  }

  onSubmit() {
    const formModel = this.articleForm.value;

    if (this.articleForm.valid) {
      let date = new Date( 
        new Date(formModel.date).getUTCFullYear(),
        new Date(formModel.date).getUTCMonth(),
        new Date(formModel.date).getUTCDate())
      const article: any = {
        _id: formModel.id,
        name: formModel.name,
        description: formModel.description,
        presentation: formModel.presentation,
        notes:[formModel.notes],
        prices: [{price: formModel.price, date: date}]
      };

      this.addOrUpdate(article);

    }
    else{
      this.toastr.error('Debe completar todos los datos!');
    }
  }

  getNotes() {
    this.notesService.getAll().subscribe((notes: any) => {
      this.notes = notes;
    });
    let index = this.notes.indexOf({_id: '', name: ''})
    if(index > -1){
      this.notes.slice(index, 1)
    }
  }

  goBack() {
    this.router.navigate(['/articles']);
  }

  addOrUpdate(article: any){

    const apiCall = this.isEdit ? 
        this.articleService.updateArticles(article) : 
        this.articleService.addArticles(article);

        apiCall.subscribe(resp => {
            this.toastr.success(`Artículo ${this.isEdit ? 'actualizado' : 'agregado'} exitosamente!`);
            this.goBack();
          }, e =>{
            this.toastr.error(e.error.error);
        });
  }

}
