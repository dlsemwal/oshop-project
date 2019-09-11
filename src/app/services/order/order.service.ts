import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService,
    private auth: AuthService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order)
    this.cartService.clearCart()
    return result
  }

  getOrders() {
    return this.db.list('/orders').valueChanges()
  }

  getOrdersByUser() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.db.list('/orders', ref => ref.orderByChild('userId')
          .equalTo(user.uid)).valueChanges()
      })
    )
  }

}
