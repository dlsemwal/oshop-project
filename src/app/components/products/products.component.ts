import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category;
  cart;
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
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

  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
