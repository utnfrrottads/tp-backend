import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


export class Field{
    constructor(
           public name: string,
           public description: string,
           public price: number,
           public cantMaxPlayers:number,
           public openingHour: Date,
           public closingHour: Date,
           public user: string,
           public image?:string,
        ){}

}