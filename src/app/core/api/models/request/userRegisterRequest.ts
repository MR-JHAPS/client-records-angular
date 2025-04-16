export class UserRegisterRequest{

    constructor(
        public email : string = "",
        public password: string = "",
        public confirmPassword: string = "",
    ){}


}