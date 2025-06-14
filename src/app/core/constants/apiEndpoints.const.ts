// import { environment } from "../../../environments/environment.prod";
import { environment } from "../../../environments/environment";

export const API_ENDPOINTS= {
    

    // apiBaseUrl : environment.apiUrl,
        apiBaseUrl : environment.apiUrl,
        // apiBaseUrl : "http://localhost:8080/api",
    // imageBaseUrl : "https://limitless-tor-07059-c4eab57a6fb3.herokuapp.com",

    publicApi: {
       login : "/public/login",
       signup: "/public/signup",
       validateToken : "/public/validate-token",
       sendEmailVerification : "/public/send-verification-email",
       verifyCode : (verificationCode: string) => `/public/verify-email?verification_code=${verificationCode}`
    },

    
    userApi: {
        getCurrentUser: "/user/me",
        updateCurrentUser: "/user/me",
        updateProfilePicture: "/user/me/image",
        deleteCurrentUser: "/user/me",
        removeProfilePicture: "/user/me/image"
    },

    adminApi: {
        getCurrentUser: "/admin/me",
        getUserById:(id:number) => `/admin/users/${id}`,
        getAllUsers: "/admin/users",
        getUsersByRole: "/admin/users/by-role",
        searchUserByEmail: "/admin/users/search",
        updateUserRole:(id: number) => `/admin/users/${id}/roles`,
        updateCurrentAdmin: "/admin/me",
        deleteUserById: (id: number) => `/admin/users/${id}`
    },

    roleApi: { 
        saveNewRole: "/roles",
        getAllRoles: "/roles",
        /*  
            NOT SURE IF I WANT THIS TO PREVENT ISSUES FOR ACCIDENTAL DELETION OF ADMIN/USER .
            WHICH COULD CAUSE WHOLE APPLICATION AUTHORIZATION FAILURE.
         */
        // deleteRole:(id: number) => `/roles/${id}` 
    },

    clientApi:{
        getAllClients: "/clients",
        getClientById: (id: number) => `/clients/${id}`,
        saveNewClient: "/clients",
        updateClientById:(id: number) => `/clients/${id}`,
        searchClients: "/clients/search",
        deleteClientById:(id: number) => `/clients/${id}`,
        deleteMultipleClientsByIdList: "/clients"
    },

    clientBinApi: {
        getAllClientBin: "/client-bins",
        restoreFromClientBin:(id: number) => `/client-bins/${id}/restore`,
        deleteFromClientBin:(id: number) => `/client-bins/${id}/delete`
    },

    clientLogApi: {
        getAllClientLog: "/client-logs",
        getClientLogById:(id: number) => `/client-logs/${id}`
    },

    fileApi: {
        getFileById:(fileId: number) => `/files/${fileId}`,
        getAllFilesOfAuthenticatedUser: "/files/me",
        uploadFileForAuthenticatedUser: "/files",
        deleteFileById:(fileId: number) => `/files/${fileId}`,
        deleteMultipleFileById: "/files" // the imageID's are passed through params.
    }









}// ends const.