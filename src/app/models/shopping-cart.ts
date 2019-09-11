import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    private _items: ShoppingCartItem[] = []


    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            item.product.id = productId;
            this._items.push(new ShoppingCartItem(item.product, item.quantity))
        }
    }

    get productIds() {
        return Object.keys(this.itemsMap)
    }

    get totalItemCount() {
        let count = 0
        for (let productId in this.itemsMap) {
            count += +this.itemsMap[productId].quantity
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let item of this._items) {
            sum += item.totalPrice
        }
        return sum
    }

    get items() {
        return this._items
    }

    getQuantity(productId) {
        let item = this.itemsMap ? this.itemsMap[productId] : null
        return item ? item.quantity : 0;
    }
}
