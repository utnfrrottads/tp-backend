import { CartItem } from './cart-item';
import { User } from './user';


export class Sale {

    // tslint:disable-next-line:max-line-length
    constructor(obj: any){
        this._id = obj._id || '';
        this.transactionNumber = obj.transactionNumber || 0;
        this.pc = obj.pc || '';
        this.date = obj.date || ((new Date()).getFullYear()+'-'+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + new Date().getDate()).slice(-2));
        this.street = obj.street || '';
        this.number = obj.number || '';
        this.client = obj.client || '';
        this.deletedClient = obj.deletedClient || new User();
        this.cart = obj.cart || [new CartItem({})];
        this.total = obj.total || 0;
    }

    _id: string;
    transactionNumber: number;
    pc: string;
    date: Date;
    street: string;
    number: string;
    client: string;
    deletedClient: User;
    cart: Array<CartItem>;
    total: Number;
}
