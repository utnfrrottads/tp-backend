import { Product } from "./product";

export class CartItem {

    constructor(cartItem: any){
        this.product = cartItem.product || "";
        this.quantity = cartItem.qty || 0;
    }

    product: string;
    quantity: number;
}
