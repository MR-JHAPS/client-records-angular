export class TokenValidateRequest{
    

    constructor(
        public token : string = ""
    ){}


    setTokenName(token : string):void{
        this.token = token;
    }

    getTokenName():string{
        return this.token;
    }

}