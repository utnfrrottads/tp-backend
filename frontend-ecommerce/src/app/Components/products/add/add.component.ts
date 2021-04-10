import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../Services/product.service';
import { BranchService } from '../../../Services/branch.service';
import { ArticleService } from '../../../Services/article.service';
import { Branch } from 'src/app/Models/branch';
import { Article } from 'src/app/Models/article';
import { Price } from 'src/app/Models/price';

@Component({
  selector: 'app-add-products',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddProductComponent implements OnInit{
  productForm: FormGroup;
  sendFormData: any;
  article = [new Article()];
  branch =[new Branch()];
  isEdit = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private branchService: BranchService,
    private articleService: ArticleService
 
  ) {
    this.productForm = this.fb.group({
      id: [''],
      branch: ['', Validators.required],
      article: ['', Validators.required],
      stock: ['', Validators.required],
      //isActive: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getBranches();
    this.getArticle();
    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.productService.getById(params.get('id')).subscribe(product => {
          this.isEdit = true;
          this.productForm.patchValue({
            id: product._id,
            branch: product.branch,
            article: product.article,
            stock: product.stock,
            //isActive: product.isActive
          });
        });
      }
    });
  }

  onSubmit() {
    const formModel = this.productForm.value;

    if (this.productForm.valid) {

      const product: any = {
        _id: formModel.id,
        branch: formModel.branch,
        article: formModel.article,
        stock: formModel.stock,
        isActive: true
      };
      console.log(product)

      if (this.isEdit){
        this.productService.updateProduct(product).subscribe(x => {
          this.toastr.success('Producto actualizado exitosamente!');
          this.goBack();
        });
      }
      else {
        this.productService.addProduct(product).subscribe(x => {
          this.toastr.success('Producto registrado exitosamente!');
          this.goBack();
        });
      }

    }
    else{
      this.toastr.error('Error al registrar el producto!');
    }
  }

  getBranches() {
    this.branchService.getAll().subscribe((branch: any) => {
      this.branch = branch;
    });
    var index = this.branch.indexOf({_id: '', cuit: '', street: '', number: '', pc:'', phone:0})
    if(index > -1){
      this.branch.slice(index, 1)
    }
  }

  getArticle() {
    let obj = {
      name:[],
      presentation:[],
      notes:[]
    }
    this.articleService.getArticles(obj).subscribe((article: any) => {
      this.article = article;
    });
    var index = this.article.indexOf({_id: '', name: '', description: '', presentation :'', notes:[''], prices : [new Price()]})
    if(index > -1){
      this.article.slice(index, 1)
    }
  }

  goBack() {
    this.router.navigate(['/product']);
  }

}
