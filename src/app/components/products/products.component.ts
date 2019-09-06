import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories$;
  category;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoriesService: CategoriesService) {
      
    productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products
          return route.queryParamMap
        }))
      .subscribe(params => {
        this.category = params.get('category')
        this.filteredProducts = this.category ?
          this.products.filter(p => p.payload.val().category == this.category) :
          this.products
      })
    this.categories$ = categoriesService.getAll();
  }

  ngOnInit() {
  }

}
