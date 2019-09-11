import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from 'src/app/models/order';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit() {


    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy() {

    this.userSubscription.unsubscribe()

  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart.items)
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

}
