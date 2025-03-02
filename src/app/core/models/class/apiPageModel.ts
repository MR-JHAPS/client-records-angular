export class ApiPageModel{

    //I created this class to instanciate the new object and since interface won't let me do it.

    private size: number;               
    private number: number ;            
    private totalPages: number ;        
    private totalElements: number ; 
     

    //this 0 allows us to work as a No-args constructor in java
    constructor( size:number=0, number: number=0, totalPages: number=0, totalElements:number=0  ){
        this.number = number;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    




}//ends class