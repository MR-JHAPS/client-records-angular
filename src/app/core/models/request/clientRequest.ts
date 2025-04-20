export class ClientRequest{

    constructor(
        public id ?: number,
        public firstName: string = "",
        public lastName: string = "",
        public dateOfBirth: Date = new Date() ,
        public postalCode: string = ""
    ){}

    


}