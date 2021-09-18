export class Branch {

    constructor(_id= '', cuit= '', street= '', number = '', postalCode= '', phone= 0){
        this._id = _id;
        this.cuit = cuit;
        this.street = street;
        this.number = number;
        this.postalCode = postalCode;
        this.phone = phone;
    }

    _id: string;
    cuit: string;
    street: string;
    number: string;
    postalCode: string;
    phone: number;
}


