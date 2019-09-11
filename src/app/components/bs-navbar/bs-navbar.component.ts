import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ShoppingCartService } from 'app/services/shopping-cart/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user: AppUser;
  shoppingCartItemCount: number;

  constructor(
    public auth: AuthService,
    private cartService: ShoppingCartService) { }

  logout() {
    this.auth.logout()
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.user = appUser)

    let cart$ = await this.cartService.getCart()
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = cart.totalItemCount
    })
  }

}
