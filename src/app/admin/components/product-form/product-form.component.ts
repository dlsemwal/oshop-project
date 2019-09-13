import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoriesService } from 'shared/services/categories/categories.service';
import { ProductService } from 'shared/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  id: string;
  product: any = {};
  title: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.categories$ = categoriesService.getAll();
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      productService.get(this.id)
        .pipe(
          take(1)
        ).subscribe(
          p => this.product = p
        );
    }
  }

  save(product) {
    if (this.id) { this.productService.update(this.id, product); } else { this.productService.create(product); }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure? \n You want to delete this product')) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
