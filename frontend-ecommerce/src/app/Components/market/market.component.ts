import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { ArticleService } from 'src/app/Services/article.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
  providers: [ArticleService]
})
export class MarketComponent implements OnInit {

  filters= {
    "name": "",
    "presentations": ["50 ml", "25 ml", "15 ml"],
    "notes": ["Frutal", "Floral", "Citrico"]
  }

  filterValues={
    "name": "",
    "presentations": [""],
    "notes": [""]
  }

  constructor(public articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles(this.filters)
    this.getFilters()
  }
  
  ngOnChanges():void {
    this.getFilters()
  }

  getFilters(){
      this.articleService.articles.forEach(article => {
        article.notes.forEach(note => {
          this.filterValues.notes.push(note)
        });
        this.filterValues.presentations.push(article.presentation)
        var index = this.filterValues.notes.indexOf("", 0);
        if (index > -1) {
          this.filterValues.notes.splice(index, 1);
        }
        index = this.filterValues.presentations.indexOf("", 0);
        if (index > -1) {
          this.filterValues.presentations.splice(index, 1);
        }
      });

  }

  getArticles(filters: object){
    this.articleService.getArticles().subscribe(res => {
      this.articleService.articles = res as Article[]
      console.log(res)
    })
  }

  onCBNote(e:any){
    if(e.target.checked){
      this.filters.notes.push(e.target.value)
    }else{
      const index = this.filters.notes.indexOf(e.target.value, 0);
        if (index > -1) {
          this.filters.notes.splice(index, 1);
      }
    }
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
