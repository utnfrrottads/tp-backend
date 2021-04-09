import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Article } from 'src/app/Models/article';
import { Note } from 'src/app/Models/note';
import { ArticleService } from 'src/app/Services/article.service';
import { NoteService } from 'src/app/Services/note.service';
import { ToastrService } from 'ngx-toastr'
import { Sale } from 'src/app/Models/sale';
import { CartItem } from 'src/app/Models/cart-item';
import { BranchService } from 'src/app/Services/branch.service';
import { Branch } from 'src/app/Models/branch';
import { Product } from 'src/app/Models/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

export interface IMyCartItem {
  'article': Article;
  'qty': number;
  'branch': Branch
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
  providers: [ArticleService]
})



export class MarketComponent implements OnInit {

  searchBar = true;

  filtersEmpty = {
    name: [],
    presentation: [],
    notes: []
  };

  public currentSale: Sale;

  public message : string = ""

  public cartArticle: Array<IMyCartItem>

  public totalPrice = 0

  constructor(
    private productService: ProductService,
    private router: Router,
    private ref: ChangeDetectorRef, 
    public articleService: ArticleService, 
    private branchService: BranchService ,
    public noteService: NoteService, 
    private toastr: ToastrService) 
  {
      this.cartArticle = [] 
      this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({})))
  }

  ngOnInit(): void {
    this.getArticles(this.filtersEmpty);
    this.getFilters();    
    this.mapCartItems();
  }

  ngOnChanges():void {
    this.getArticles(this.articleService.filters)
  }

  getFilters(){
    this.articleService.getArticles(this.filtersEmpty).subscribe(res => {
        this.articleService.allArticles = res as Article[];
        this.articleService.allArticles.forEach(article => {
          article.notes.forEach(note => {
            var noteValue: string = ""
            this.noteService.getById(note).subscribe(res =>{
              noteValue = (res as Note).name
              if(!this.articleService.filterValues.notes.includes(noteValue)){
                this.asignName(noteValue)
              }
            })
          });
          if(!this.articleService.filterValues.presentation.includes(article.presentation)){
            this.articleService.filterValues.presentation.push(article.presentation)
          }
        });
        this.articleService.filterValues.notes.forEach(note => {
              if (this.articleService.filters.notes.includes(note)){
                (document.getElementById(`noteItem${note}`) as HTMLFormElement).checked = true;
              }
        });
        this.articleService.filterValues.presentation.forEach(presentation => {
            if (this.articleService.filters.presentation.includes(presentation)){
              (document.getElementById(`presentationItem${presentation}`) as HTMLFormElement);
            }
        });
      });
  }

  asignName(name: string){
    this.articleService.filterValues.notes.push(name);
  }

  getArticles(filters: object){
    this.articleService.getArticles(filters).subscribe(res => {
      this.articleService.articles = res as Article[];
    });
  }

  onCBNote(e: any){
    if (e.target.checked){
      this.articleService.filters.notes.push(e.target.value);
    }else{
      const index = this.articleService.filters.notes.indexOf(e.target.value, 0);
      if (index > -1) {
          this.articleService.filters.notes.splice(index, 1);
      }
    }
    this.getArticles(this.articleService.filters)
  }

  onCBPresentation(e: any){
    if (e.target.checked){
      this.articleService.filters.presentation.push(e.target.value);
    }else{
      const index = this.articleService.filters.presentation.indexOf(e.target.value, 0);
      if (index > -1) {
          this.articleService.filters.presentation.splice(index, 1);
      }
    }
    this.getArticles(this.articleService.filters);
  }
  /* Set the width of the side navigation to 250px */
  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  openNav() {
    (document.getElementById('mySidenav') as HTMLFormElement).style.width = '250px';
    (document.getElementById('main') as HTMLFormElement).style.marginLeft = '250px';
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
    (document.getElementById('mySidenav') as HTMLFormElement).style.width = '0';
    (document.getElementById('main') as HTMLFormElement).style.marginLeft = '0';
  }

  onNameSearched(e: any){
    this.articleService.filters.name=[]
    if(e !== ""){
      this.articleService.filters.name.push(e)
    }
    this.getArticles(this.articleService.filters)
  }

  addArticle(e: any){
    this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({})))
    var id = -1
    this.currentSale.cart.forEach((item, index) => {
      if(e.prod == item.product){
        id = index
      }
    })
    if(id < 0){
      var newItem = new CartItem({'product': e.prod, 'qty': e.qty})
      this.currentSale.cart.push(newItem)
      localStorage.setItem("CurrentSale", JSON.stringify(this.currentSale))
      this.mapCartItems()
      this.toastr.success("Item Añadido Exitosamente")
    } else{
      this.toastr.error("Ya Posee este Articulo en el Carrito", "Error")
    }
  }

  onError(e: any){
    this.toastr.error(e, 'Error')
  }

  updateQty(e:any) {
    this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({}))) 
    this.currentSale.cart.forEach(item => {
      if(item.product == e.prod._id){
        item.quantity = e.qty
      }
    })
    localStorage.setItem("CurrentSale", JSON.stringify(this.currentSale))
    this.mapCartItems()
    this.ref.detectChanges()
    this.toastr.info("Item Actualizado Exitosamente")
  }

  deleteItem(e: any){
    this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({}))) 
    this.currentSale.cart.forEach((item, index) => {
      if(item.product == e._id){
        this.currentSale.cart.splice(index, 1)
      }
    })
    localStorage.setItem("CurrentSale", JSON.stringify(this.currentSale))
    this.mapCartItems()
    this.ref.detectChanges()
    this.toastr.info("Item Eliminado Exitosamente.")
  }

  mapCartItems(){
    this.totalPrice = 0
    this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({cart: []})))
    this.cartArticle = []
    if(this.currentSale.cart.length !== 0){
      this.currentSale.cart.forEach(item => {
        this.productService.getProduct(item.product).subscribe(res => {
          var prod = res as Product
          var cartItem = {'article':new Article(), 'qty': 0, 'branch': new Branch()}
          this.articleService.getArticle(prod.article).subscribe(res => {
            cartItem.article = res as Article
            this.updatePrice(cartItem.article.prices[0].price, item.quantity)
          })
          this.branchService.getById(prod.branch).subscribe(res => {
            cartItem.branch = res as Branch
          })
          cartItem.qty = item.quantity
          this.cartArticle.push(cartItem)
        })
      })
    } 
  }

  updatePrice(price: number, qty: number) {
    this.totalPrice += price * qty
  }

  finishSale() {
    this.currentSale = this.currentSale = JSON.parse(localStorage.getItem("CurrentSale") || JSON.stringify(new Sale({}))) 
    
    if(this.currentSale.cart.length < 1){
      this.toastr.error("Debe agregar items al carrito", "Error")
    } else {
      this.router.navigate(['/finish-sale'])
    }

  }
}
