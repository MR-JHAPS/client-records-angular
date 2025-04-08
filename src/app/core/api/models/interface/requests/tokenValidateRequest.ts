export class TokenValidateRequest{
    token : string;

    constructor(){
        this.token;
    }


    setTokenName(token : string):void{
        this.token = token;
    }

    getTokenName():string{
        return this.token;
    }

}