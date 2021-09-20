export class Role {

    constructor(_id= '', name = '', description= '', permissions = ['']){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.permissions = permissions;
    }

    _id: string;
    name: string;
    description: string;
    permissions: Array<string>;
}
