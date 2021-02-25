export class Price {
    constructor(price= 0, date= new Date('')){
        this.price = price;
        this.date = date;
    }

    price: number;
    date: Date;
}
