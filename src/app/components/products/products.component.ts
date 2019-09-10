import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  category;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart()
    this.populateProducts()
  }

  private populateProducts() {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products
          return this.route.queryParamMap
        }))
      .subscribe(params => {
        this.category = params.get('category')
        this.applyFilter()
      })
  }

  private applyFilter() {
    this.filteredProducts = this.category ?
      this.products.filter(p => p.payload.val().category == this.category) :
      this.products
  }

}
