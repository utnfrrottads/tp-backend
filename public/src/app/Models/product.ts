export class Product {

    constructor(_id= '', branch= '', article= '', stock= 0, isActive= false){
        this._id = _id;
        this.branch = branch;
        this.article = article;
        this.stock = stock;
        this.isActive = isActive;
    }

    _id: string;
    branch: string;
    article: string;
    stock: Number;
    isActive: boolean;
}

