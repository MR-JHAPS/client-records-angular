export interface UserAdminResponse{

    id: number,
    profileImageUrl: string,
    email: string,
    emailVerified: boolean,
    roles : string[],
    createdOn: Date,
    updatedOn: Date

} 