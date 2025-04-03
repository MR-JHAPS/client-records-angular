export const API_ENDPOINTS= {

    apiBaseUrl : "http://localhost:8080/api",

    publicApi: {
       login : "/public/login",
       signup: "public/signup"
    },

    
    userApi: {
        getCurrentUser: "/user/me",
        updateCurrentUser: "/user/update/me",
        updateProfilePicture: "/user/image/save",
        deleteCurrentUser: "/user/delete/me"
    },

    adminApi: {
        getUserById: "/admin/user/",
        getAllUsers: "/admin/user/find-all",
        getUsersByRole: "/admin/search-by/role",
        searchUserByEmail: "/admin/search-by/email",
        updateUserRole: "/admin/user/update-role/",
        updateCurrentAdmin: "/admin/update/me",
        deleteUserById: "/admin/delete/"
    },

    roleApi: { 
        saveNewRole: "roles/save",
        getAllRoles: "/roles",
        deleteRole: "roles/delete/"

    },

    clientApi:{
        getAllClients: "/clients/getAll",
        getClientById: "/clients/get/",
        saveNewClient: "/clients/insert",
        updateClientById: "/clients/update/",
        searchClients: "/clients/search",
        deleteClientById: "/clients/delete/"
    },

    clientBinApi: {
        getAllClientBin: "/client-bin/getAll",
        restoreFromClientBin: "/client-bin/restore/",
        deleteFromClientBin: "/client-bin/delete/"
    },

    clientLogApi: {
        getAllClientLog: "/clientLog/getAll",
        getClientLogById: "/clientLog/get/"
    },

    imageApi: {
        getImageById: "/images/",
        getAllImagesOfAuthenticatedUser: "/images/current-user/get-all",
        uploadImageForAuthenticatedUser: "/images/insert",
        deleteImageById: "/images/delete/",
        deleteMultipleImageById: "/images/delete/multiple"
    }









}// ends const.