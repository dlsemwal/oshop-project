import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    public items: ShoppingCartItem[] = []

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            this.items.push(new ShoppingCartItem(item.product, item.quantity))
        }
    }

    get productIds() {
        return Object.keys(this.itemsMap)
    }

    get shoppingCartItemCount() {
        let count = 0
        for (let productId in this.itemsMap) {
            count += +this.itemsMap[productId].quantity
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let item of this.items) {
            sum += item.totalPrice
        }
        return sum
    }
}
