export const environment = {

    //THIS PAGE CONTAINS ALL THE API's URL.

    apiBaseUrl : "http://192.168.1.25:8080",

    publicEndpoint:{
        login : "/public/login",
        signup : "/public/signup"
    },

    clientEndpoint : {
        getAllClients : "/api/clients",
        getClientById : "/api/clients/id",
        insertClient : "/api/clients/insert", 
        updateClient : "/api/clients/update/id",
        deleteClient : "/api/clients/delete/id",

        getClientsBySearchQuery : "/api/clients/search",
        getClientsByPostalCode : "/api/clients/search/postalCode/{postalCode}",
        getClientsByFirstName : "/api/clients/search/firstName/{firstName}",
        getClientsByLastName : "/api/clients/search/lastName/{lastName}"

    },

    userEndpoint : {
        getUserById : "/user/role/{role}",
        getUserByRole : "/user/id/{id}",
        getAllUsers : "/user/findAll"

    },

    adminEndpoint : {


    }





}//ends const