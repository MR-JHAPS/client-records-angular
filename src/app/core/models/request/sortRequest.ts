export class SortRequest{

    constructor(
        public sortBy : string = "id",
        public direction : Direction = Direction.Ascending
    ){}

    public getSortBy() : string{
        return this.sortBy;
    } 

    public setSortBy(sortBy : string){
        this.sortBy = sortBy;
    }

    public getDirection(): Direction{
        return this.direction;
    }

    public setDirection(direction : Direction) : void{
        this.direction = direction;
    }

}

/* This is the enum for the Direction for sorting. */
export enum Direction {
    Ascending = "asc",
    Descending = "desc"
}