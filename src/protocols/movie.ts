export type MovieEntity = {
    id: number,
    name: string,
    platformId: number, 
    genreId: number, 
    status: string,
    rate: number,
    review: string
}

export type Movie = Omit<MovieEntity, "id" | "rate" | "review">