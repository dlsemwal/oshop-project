import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'app/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions;
  @Input('shopping-cart') cart: ShoppingCart;
  @Input('key') key;


  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product, this.key)
  }
  

}
