import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ShoppingCart } from "shared/models/shopping-cart";
import { Order } from "shared/models/order";
import { AuthService } from "shared/services/auth/auth.service";
import { OrderService } from "shared/services/order/order.service";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input("cart") cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user ? user.uid : null;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart.items);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
