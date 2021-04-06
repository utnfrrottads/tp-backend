import { Price } from './price';

export class Article {

    constructor(_id= '', name= '', description= '', presentation= '', notes= [''], prices= [new Price()]){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.presentation = presentation;
        this.notes = notes;
        this.prices = prices;
    }

    _id: string;
    name: string;
    description: string;
    presentation: string;
    notes: Array<string>;
    prices: Array<Price>;

}