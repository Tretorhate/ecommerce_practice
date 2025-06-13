import { Order } from "./order.model"
import { Review } from "./review.model"
export interface Profile{
    id: string,
    name: string,
    email: string,
    picture: string,
    orders:Order[],
    reviews:Review[]
}