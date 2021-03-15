export class Branch {

    constructor(_id= '', cuit= '', street= '', number = '', pc= '', phone= 0){
        this._id = _id;
        this.cuit = cuit;
        this.street = street;
        this.number = number;
        this.pc = pc;
        this.phone = phone;
    }

    _id: string;
    cuit: string;
    street: string;
    number: string;
    pc: string;
    phone: number;
}


