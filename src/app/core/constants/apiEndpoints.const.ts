export const API_ENDPOINTS= {

    apiBaseUrl : "https://limitless-tor-07059-c4eab57a6fb3.herokuapp.com/api",
    imageBaseUrl : "https://limitless-tor-07059-c4eab57a6fb3.herokuapp.com",

    publicApi: {
       login : "/public/login",
       signup: "/public/signup",
       validateToken : "/public/validate-token"
    },

    
    userApi: {
        getCurrentUser: "/user/me",
        updateCurrentUser: "/user/me",
        updateProfilePicture: "/user/me/image",
        deleteCurrentUser: "/user/me",
        removeProfilePicture: "/user/me/image"
    },

    adminApi: {
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

    imageApi: {
        getImageById:(imageId: number) => `/images/${imageId}`,
        getAllImagesOfAuthenticatedUser: "/images/me",
        uploadImageForAuthenticatedUser: "/images",
        deleteImageById:(imageId: number) => `/images/${imageId}`,
        deleteMultipleImageById: "/images" // the imageID's are passed through params.
    }









}// ends const.