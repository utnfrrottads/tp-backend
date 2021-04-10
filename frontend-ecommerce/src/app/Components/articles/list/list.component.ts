import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../../Services/article.service';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/Models/note';
import { NoteService } from 'src/app/Services/note.service';
import { Article } from 'src/app/Models/article';

@Component({
  selector: 'app-articles',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ArticlesComponent implements OnInit {

  items: any = [];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private toastr: ToastrService,
    public noteService: NoteService
    ) {
  }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    let obj= {
        "name":[],
        "presentation":[],
        "notes":[] 
    }
    this.articleService.getArticles(obj).subscribe(x => {
      this.items = x;
    });
  }

  addArticle() {
    this.router.navigate(['/add-article']);
  }

  editArticle(item: any) {
    this.router.navigate(['/edit-article', item._id ]);
  }

  deleteArticles(item: any) {
    this.articleService.deleteArticles(item._id).subscribe(x => {
      this.toastr.success('Artículo eliminado');
      this.updateList();
    });

  }


  noteList(article: any){
    return article.notesInfo.map((x: any) => x.name).join(',');
  }
}