export class User {
    // tslint:disable-next-line:max-line-length
    constructor(_id= '', dni= '', names= '', lasNames= '', username= '', password= '', email= '', pc= '', street= '', number= '', flat= '', phone= '', employee= false, client= false, roles= ['']){
        this._id = _id;
        this.dni = dni;
        this.names = names;
        this.lastNames = lasNames;
        this.username = username;
        this.password = password;
        this.email = email;
        this.pc = pc;
        this.street = street;
        this.number = number;
        this.flat = flat;
        this.phone = phone;
        this.employee = employee;
        this.client = client;
        this.roles = roles;
    }

    _id: string;
    dni: string;
    names: string;
    lastNames: string;
    username: string;
    password: string;
    email: string;
    pc: string;
    street: string;
    number: string;
    flat: string;
    phone: string;
    employee: boolean;
    client: boolean;
    roles: Array<string>;
}
