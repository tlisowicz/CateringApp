import { Comment } from "./comment";


export const COMMENTS: Comment[] = [
    {
        id: 0,
        dishId: 4,
        rating: 5,
        comment: "Imagine all the eatables, living in conFusion!",
        author: "John Lemon",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        id: 1,
        dishId: 1,
        rating: 4.15,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        id: 10,
        dishId: 1,
        rating: 4.15,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        id: 11,
        dishId: 1,
        rating: 4.15,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        id: 12,
        dishId: 1,
        rating: 4.15,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        id: 13,
        dishId: 1,
        rating: 4.15,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        id: 2,
        dishId: 2,
        rating: 3.30,
        comment: "Eat it, just eat it!",
        author: "Michael Jaikishan",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    {
        id: 3,
        dishId: 3,
        rating: 4,
        comment: "Ultimate, Reaching for the stars!",
        author: "Ringo Starry",
        addedAt: new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
];