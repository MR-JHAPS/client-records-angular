export class BulkClientDeleteRequest {

        

    constructor(
       public idList : number[] = []
    ){}
    
    public getClientIdList(): number[]{
        return this.idList ;
    }

    //checks if the the ClientIdList Contains the id provided.
    public includesClientId(id: number) : boolean {
       return this.getClientIdList().includes(id);
    }

    //helper
    public addClientId(clientId : number) : BulkClientDeleteRequest {
       return this.includesClientId(clientId) ? 
       this : new BulkClientDeleteRequest([...this.idList, clientId]); //... is spread operator that spreads the idList. (or we can push)
    }

    //helper
    public removeClientId(clientId : number): BulkClientDeleteRequest {
       return new BulkClientDeleteRequest( this.idList.filter(id => id!==clientId));
    }

}