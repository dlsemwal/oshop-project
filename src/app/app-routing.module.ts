import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { LoginComponent } from './core/components/login/login.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AuthGuard } from 'shared/guards/auth-guard.service';
import { AdminAuthGuard } from './admin/guards/admin-auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
