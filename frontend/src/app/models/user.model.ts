import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class User{
    constructor(
        public name: string,
        public address: string,
        public phone: number,
        public email: string,
        public password?: string,
        public role?: {id: string,
                        description: string},
        public uid?: string,
        ){}

    /*Feature for user's image (add image in constructor) use this with the instance
    get imageURL(){
        if (this.image.includes('http')){
            return this.image;
        }
        if(this.image){
            return `${base_url}/uploads/user/${this.image}`
        }
        else{
            return `${base_url}/uploads/no-image.png`
        }
    }*/
}
