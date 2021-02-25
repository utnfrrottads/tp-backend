import { CartItem } from "./cart-item";
import { User } from "./user";

export class Sale {
    
    constructor(_id='', transNum = 0, pc='', date= new Date(), street='', number='', client = '', deletedClient= new User(), cart=[new CartItem()]){
        this._id=_id;
        this.transactionNumber = transNum;
        this.pc = pc;
        this.date = date;
        this.street = street;
        this.number = number;
        this.client = client;
        this.deletedClient = deletedClient;
        this.cart = cart;
    }

    _id: string;
    transactionNumber:number;
    pc: string;
    date: Date;
    street: string;
    number: string;
    client: string;
    deletedClient: User;
    cart: Array<CartItem>;
}
