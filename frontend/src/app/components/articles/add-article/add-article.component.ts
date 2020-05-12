import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article';
import { Supplier } from '../../../models/supplier/Supplier';
import { ClientSupplier } from './../../../models/client-supplier/client-supplier';
import { ArticleService } from "../../../services/article/article.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;
  supplier: Supplier;
  clientSupplier: ClientSupplier;

  constructor(private articleService: ArticleService, private router: Router) { 
    this.article = new Article();
    this.supplier = new Supplier();
    this.clientSupplier = new ClientSupplier();

    this.supplier.setProvArt(this.clientSupplier);
    this.article.setSupplier(this.supplier);
  }

  ngOnInit(): void {
  }

  addArticle(){
    this.article.proveedores.id_proveedor = 1;
    this.articleService.addArticle(this.article)
      .subscribe(
        res => {
          this.router.navigate(['/articles']);
        },
        err => console.log(err)
      );
  }
}
