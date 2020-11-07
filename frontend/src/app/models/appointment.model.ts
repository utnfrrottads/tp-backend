export class Appointment{
    constructor(
           public id: string,
           public date: Date,
           public user: string,
           public createDate: Date,
           public state: string,
           public field: {
               id: string,
               name: string
            },
           public owner: {
               name: string,
               oid: string,
               phone: number,
           }
        ){}

}
