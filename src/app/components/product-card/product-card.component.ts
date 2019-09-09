import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions;
  @Input('shopping-cart') cart;
  @Input('key') key;


  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product, this.key)
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product, this.key)
  }

  getQuantity() {
    if (!this.cart) return 0;
    let item = this.cart.items[this.key];
    return item ? item.quantity : 0
  }

}
