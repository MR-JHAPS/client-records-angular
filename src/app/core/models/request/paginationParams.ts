export interface PaginationParams{

    pageNumber : number,
    pageSize : number,
    sortBy : string,
    direction : Direction, 




}

export type Direction =  "asc" | "desc";