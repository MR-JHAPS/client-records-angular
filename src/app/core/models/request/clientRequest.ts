export class ClientRequest{

    constructor(
        public id : number = 0,
        public firstName: string = "",
        public lastName: string = "",
        public dateOfBirth: Date = new Date() ,
        public postalCode: string = ""
    ){}


}