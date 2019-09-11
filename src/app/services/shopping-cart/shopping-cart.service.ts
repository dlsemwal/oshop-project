import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-cart/' + cartId).valueChanges()
      .pipe(map(cart => new ShoppingCart(cart['items'])))
  }

  addToCart(product, key) {
    this.updateQuantity(product, key, 1)
  }

  removeFromCart(product, key) {
    this.updateQuantity(product, key, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId()
    this.db.object('/shopping-cart/' + cartId + '/items/').remove()
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cartId', result.key)

    return result.key
  }

  async updateQuantity(product, key: string, change: number) {
    let cartId = await this.getOrCreateCartId()
    let item$ = this.getItem(cartId, key)
    item$.valueChanges().pipe(take(1)).subscribe((item: ShoppingCartItem) => {
      let quantity = (item ? item.quantity : 0) + change;
      if (quantity === 0) item$.remove()
      else item$.update({ product: product, quantity: quantity })
    })
  }



}
