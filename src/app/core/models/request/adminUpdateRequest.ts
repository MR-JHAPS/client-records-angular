export class AdminUpdateRequest{

    constructor(
        public email : string = "",
        public currentPassword: string = "",
        public newPassword: string = "",
        public confirmPassword : string = "",
        public roles : string[] = []

    ){}



}//ends class