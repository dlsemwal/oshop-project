import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from 'app/services/product/product.service';
import { ShoppingCartService } from 'app/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

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
