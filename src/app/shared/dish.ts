export interface Dish {
    id: number,
    img: string[]; 
    name: string;
    kitchenType: string;
    category: string;
    typeByIngredients: string;
    ingredients: string[];
    description: string;
    price: number;
    servingsPerDay: number;
    avarageRating: number | null;
}
