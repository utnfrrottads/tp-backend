import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../Services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/Models/note';
import { NoteService } from '../../../Services/note.service';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddArticleComponent implements OnInit{
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
          this.articleForm.patchValue({
            id: article._id,
            name: article.name,
            description: article.description,
            presentation: article.presentation,
            notes: article.notes,
            price: article.prices[0].price,
            date: article.prices[0].date
          });
        });
      }

    });
      
  }

  onSubmit() {
    const formModel = this.articleForm.value;

    if (this.articleForm.valid) {

      const article: any = {
        _id: formModel.id,
        name: formModel.name,
        description: formModel.description,
        presentation: formModel.presentation,
        note:formModel.notes,
        prices: [{price: formModel.price, date: formModel.date}]
      };

      if (this.isEdit){
        this.articleService.updateArticles(article).subscribe(x => {
          this.toastr.success('Artículo actualizado exitosamente!');
          this.goBack();
        });
      }
      else {
        this.articleService.addArticles(article).subscribe(x => {
          this.toastr.success('Artículo registrado exitosamente!');
          this.goBack();
          });
        }

    }
    else{
      this.toastr.error('Error al registrar el artículo!');
    }
  }

  getNotes() {
    this.notesService.getAll().subscribe((notes: any) => {
      this.notes = notes;
    });
    var index = this.notes.indexOf({_id: '', name: ''})
    if(index > -1){
      this.notes.slice(index, 1)
    }
  }

  goBack() {
    this.router.navigate(['/articles']);
  }

}
