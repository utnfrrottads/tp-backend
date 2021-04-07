import { Product } from "./product";

export class CartItem {

    constructor(cartItem: any){
        this.product = cartItem.product || new Product();
        this.quantity = cartItem.qty || 0;
    }

    product: Product;
    quantity: number;
}
