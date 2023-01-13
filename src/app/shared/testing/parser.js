
const DISHES = [
    {
        id: 1,
        img: ["assets/imgs/chicken tikka masala.jpg", "assets/imgs/chicken tikka masala 2.jpg", "assets/imgs/chicken tikka masala 3.jpg"],
        name: "Chicken Tikka Masala",
        kitchenType: "Indian",
        category: "dinner",
        typeByIngredients: "non-vegetarian",
        description: "Chunks of roasted marinated chicken in spiced curry sauce served with naan and rice.",
        price: 20,
        servingsPerDay: 10,
        ingredients: [
            "chicken",
            "curry sauce",
            "naan",
            "rice"
        ],
        avarageRaing: null,
    },
    {
        id: 2,
        img : ["assets/imgs/Healthier-Chocolate-Oatmeal-600x899.jpg"],
        name:"chocolate oatmeal with delicacies",
        kitchenType:"American",
        category:"breakfast",
        typeByIngredients:"vegetarian",
        description:"Oatmeal with chocolate and delicacies",
        price: 10,
        servingsPerDay: 20,
        ingredients:[
            "oat flakes",
            "milk",
            "chocolate",
            "delicacies"
        ],
        avarageRaing: null,

    },
    {
        id: 3,
        img : ["assets/imgs/salmon-pasta-with-spring-vegetables-and-ricotta-104423-1.jpeg"],
        name: "salmon with pasta and vegetables",
        kitchenType: "Mediteranean",
        category: "dinner",
        typeByIngredients: "vegetarian",
        description: "Salmon with rosted in olive oil pasta and vegetables",
        price: 25,
        servingsPerDay: 15,
        ingredients: [
            "salmon",
            "pasta",
            "peas",
            "olives",
            "salad",
        ],
        avarageRaing: null,

    },
    {
        id: 4,
        img : ["assets/imgs/asian-chicken-over-rice-with-vegetables-recipe.jpg"],
        name: "chicken with rice and vegetables",
        kitchenType: "Chinese",
        category: "dinner",
        typeByIngredients: "non-vegetarian",
        description: "Chicken with rice and vegetables",
        price: 15,
        servingsPerDay: 20,
        ingredients: [
            "chicken",
            "rice",
            "carrots",
            "onions",
            "peas",
        ],
        avarageRaing: null,

    },
    {
        id: 5,
        img : ["assets/imgs/diet-nutrition_recipes_vegetable-and-tofu-stir-fry_2721x1806_000019113552.jpg"],
        name: "tofu stir fry with vegetables",
        kitchenType: "Asian",
        category: "dinner",
        typeByIngredients: "vegan",
        description: "Fired tofu with slices of tomatoes, onions, carrots",
        price: 15,
        servingsPerDay: 10,
        ingredients: [
            "tofu",
            "tomatoes",
            "onions",
            "carrots",
        ],
        avarageRaing: null,

    },
    {
        id: 6,
        img : ["assets/imgs/coconut-pancakes-with-berries-with-syrup-drizzle_1980x1320-140498-1.jpg"],
        name: "pancakes with berries",
        kitchenType: "American",
        category: "breakfast",
        typeByIngredients: "vegetarian",
        description: "Pancakes poured with cream and clone syrup with berries",
        price: 10,
        servingsPerDay: 20,
        ingredients: [
            "pancakes",
            "cream",
            "clone syrup",
            "berries",
        ],
        avarageRaing: null,

    },
    {
        id: 7,
        img : ["assets/imgs/greek-salad-horiz-a-1600-bc71b85bc907414a9bb3179a923b58fc.jpg"],
        name: "Greek salad",
        kitchenType: "Greek",
        category: "lunch",
        typeByIngredients: "vegetarian",
        description: "Salad with tomatoes, cucumbers, olives, feta cheese",
        price: 10,
        servingsPerDay: 8,
        ingredients: [
            "tomatoes",
            "cucumbers",
            "olives",
            "feta cheese",
        ],
        avarageRaing: null,

    },
    {
        id: 8,
        img : ["assets/imgs/gyros-souvlaki-zawija-sie-w-chleb-pita-z-kurczakiem-ziemniakami-i-sosem-tzatziki_79830-1779.jpg"],
        name: "Souvlaki",
        kitchenType: "Arabic",
        category: "lunch",
        typeByIngredients: "non-vegetarian",
        description: "Souvlaki with pita bread and salad",
        price: 15,
        servingsPerDay: 10,
        ingredients: [
            "pita bread",
            "salad",
            "Souvlaki",
        ],
        avarageRaing: null,

    },
    {
        id: 9,
        img : ["assets/imgs/Turkish-manti-dumplings.jpg"],
        name: "Turkish Ravioli (Manti)",
        kitchenType: "Turkish",
        category: "dinner",
        typeByIngredients: "vegetarian",
        description: "Steamed parcels stuffed with spinach and ricotta, served with garlic yoghurt and our rich tomato sauce, dusted with parmesan cheese.",
        price: 25,
        servingsPerDay: 5,
        ingredients: [
            "spinach",
            "ricotta",
            "garlic yoghurt",
            "tomato sauce",
            "parmesan cheese",
        ],
        avarageRaing: null,

    }
]

const COMMENTS = [
    {
        dishId: 4,
        rating: 5,
        comment: "Imagine all the eatables, living in conFusion!",
        author: "John Lemon",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        dishId: 1,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        dishId: 1,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        dishId: 1,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        dishId: 1,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        dishId: 1,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        dishId: 2,
        rating: 3,
        comment: "Eat it, just eat it!",
        author: "Michael Jaikishan",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        dishId: 3,
        rating: 4,
        comment: "Ultimate, Reaching for the stars!",
        author: "Ringo Starry",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
];

import fs from 'fs';


let content = JSON.stringify(COMMENTS);
fs.writeFile('comments.txt', content, err => {
    console.log('file written successfully');
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
// const dishes = DISHES;
// dishes.forEach(dish => {
//     console.log(`=================================DISH ${dish.id}=================================`);
//     console.log(JSON.stringify(dish))
// });
