import { Shipping } from './shipping';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    datePlaced: number;

    constructor(
        public userId: string,
        public shipping,
        public items: ShoppingCartItem[]) {

        this.datePlaced = new Date().getTime()
    }
}
