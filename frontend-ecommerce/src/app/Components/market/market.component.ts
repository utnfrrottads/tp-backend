import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Note } from 'src/app/Models/note';
import { ArticleService } from 'src/app/Services/article.service';
import { NoteService } from 'src/app/Services/note.service';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
  providers: [ArticleService]
})
export class MarketComponent implements OnInit {

  filtersEmpty = {
    "name": [],
    "presentation": [],
    "notes":[]
  }

  constructor(public articleService: ArticleService, public noteService: NoteService) {
  }

  ngOnInit(): void {

    this.getArticles(this.filtersEmpty)
    this.getFilters()
  }
  

  ngOnChanges():void {
    this.getArticles(this.articleService.filterValues)
  }

  getFilters(){ 
    this.articleService.getArticles(this.filtersEmpty).subscribe(res => {
        this.articleService.allArticles = res as Article[]
        this.articleService.allArticles.forEach(article => {
          article.notes.forEach(note => {
            var noteValue: string = ""
            this.noteService.getById(note).subscribe(res =>{
              noteValue = (res as Note).name
              this.asignName(noteValue)
            })
          });
          this.articleService.filterValues.presentation.push(article.presentation)
        });
        this.articleService.filterValues.notes = [...new Set(this.articleService.filterValues.notes)]
        this.articleService.filterValues.presentation = [...new Set(this.articleService.filterValues.presentation)]
        this.articleService.filterValues.notes.forEach(note => {
              if(this.articleService.filters.notes.includes(note)){
                (document.getElementById(`noteItem${note}`) as HTMLFormElement).checked = true
              }
        });
        this.articleService.filterValues.presentation.forEach(presentation => {
            if(this.articleService.filters.presentation.includes(presentation)){
              (document.getElementById(`presentationItem${presentation}`) as HTMLFormElement)
            }
        })
      })
  } 

  asignName(name: string){
    this.articleService.filterValues.notes.push(name)
  }

  getArticles(filters: object){
    this.articleService.getArticles(filters).subscribe(res => {
      this.articleService.articles = res as Article[]
      console.log(this.articleService.articles)
    })  
  }

  onCBNote(e:any){
    if(e.target.checked){
      this.articleService.filters.notes.push(e.target.value)
    }else{
      const index = this.articleService.filters.notes.indexOf(e.target.value, 0);
        if (index > -1) {
          this.articleService.filters.notes.splice(index, 1);
      }
    }
    console.log(this.articleService.filters)
    this.getArticles(this.articleService.filters)
  }

  onCBPresentation(e:any){
    if(e.target.checked){
      this.articleService.filters.presentation.push(e.target.value)
    }else{
      const index = this.articleService.filters.presentation.indexOf(e.target.value, 0);
        if (index > -1) {
          this.articleService.filters.presentation.splice(index, 1);
      }
    }
    console.log(this.articleService.filters)
    this.getArticles(this.articleService.filters)
  }
  /* Set the width of the side navigation to 250px */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
openNav() {
  (document.getElementById("mySidenav") as HTMLFormElement).style.width = "250px";
  (document.getElementById("main") as HTMLFormElement).style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
closeNav() {
  (document.getElementById("mySidenav") as HTMLFormElement).style.width = "0";
  (document.getElementById("main") as HTMLFormElement).style.marginLeft = "0";
}

}
