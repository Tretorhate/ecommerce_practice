export interface Review{
    id: string,
    createdAt: Date,
    text: string,
    rating: number,
    product:{
        title: string
    },
}