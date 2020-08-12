export class User{
    constructor(
        public name : string,
        public address : string,
        public phone : number,
        public email : string,
        public password?: string, 
        public role?: string,
        public uid?: string,
        ){
        
        }

}