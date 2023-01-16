import { Dish } from "./dish";

export interface OrderHistory {
    username: string;
    date : Date | string;
    dishes: [Dish, number][];
}