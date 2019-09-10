import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

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
      this.shoppingCartItemCount = cart.shoppingCartItemCount
    })
  }

}
