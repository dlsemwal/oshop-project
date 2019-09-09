import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Observable } from 'rxjs';

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
    let cartId = await this.getOrCreateCart()
    return this.db.object('/shopping-cart/' + cartId).valueChanges()
      .pipe(map(cart => new ShoppingCart(cart['items'])))
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId)
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cartId', result.key)

    return result.key
  }

  async updateQuantity(product, key: string, change: number) {
    let cartId = await this.getOrCreateCart()
    let item$ = this.getItem(cartId, key)
    item$.valueChanges().pipe(take(1)).subscribe((item: ShoppingCartItem) => {
      item$.update({ product: product, quantity: (item ? item.quantity : 0) + change })
    })
  }


  addToCart(product, key) {
    this.updateQuantity(product, key, 1)
  }

  removeFromCart(product, key) {
    this.updateQuantity(product, key, -1)
  }


}
