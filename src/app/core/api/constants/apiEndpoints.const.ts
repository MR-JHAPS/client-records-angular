export const API_ENDPOINTS= {

    apiBaseUrl : "http://localhost:8080/api",

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
        deleteRole:(id: number) => `/roles/${id}`
    },

    clientApi:{
        getAllClients: "/clients",
        getClientById: (id: number) => `/clients/${id}`,
        saveNewClient: "/clients",
        updateClientById:(id: number) => `/clients/${id}`,
        searchClients: "/clients/search",
        deleteClientById:(id: number) => `/clients/${id}`
    },

    clientBinApi: {
        getAllClientBin: "/client-bins",
        restoreFromClientBin:(id: number) => `/client-bins/${id}/restore`,
        deleteFromClientBin:(id: number) => `/client-bins/${id}/delete/`
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