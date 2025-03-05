export interface I_ClientDto{

    id : number;
    firstName : string;
    lastName : string;
    dateOfBirth : string;
    postalCode : string;
    
}//ends interface

export class ClientDto{
    
    public id : number;
    public firstName : string;
    public lastName : string;
    public dateOfBirth : string;
    public postalCode : string;

    constructor(id:number = 0,
                firstName:string = "",
                lastName:string = "",
                dateOfBirth :string= "",
                postalCode:string = ""
                ){
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.dateOfBirth = dateOfBirth,
        this.postalCode = postalCode

    }


        //converts the apiResponse of type "I_ClientDto"----->"ClientDto" interface to class.
    static fromApiResponse(dto: I_ClientDto):ClientDto{
        return new ClientDto(dto.id, dto.firstName, dto.lastName, dto.dateOfBirth, dto.postalCode);
    }    


}//ends class