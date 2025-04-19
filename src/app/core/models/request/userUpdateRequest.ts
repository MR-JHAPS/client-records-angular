export class UserUpdateRequest{

    constructor(
        public email : string,
        public currentPassword: string,
        public newPassword: string,
        public confirmPassword : string
    ){}


}