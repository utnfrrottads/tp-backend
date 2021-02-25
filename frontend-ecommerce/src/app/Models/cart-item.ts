export class CartItem {

    constructor(product = '' , qty = 0){
        this.product = product;
        this.quantity = qty;
    }

    product: string;
    quantity: number;
}
