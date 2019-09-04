import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.categories$ = categoriesService.getCategories()
    let id = route.snapshot.paramMap.get('id')
    productService.get(id)

  }
  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }

  ngOnInit() {
  }

}
