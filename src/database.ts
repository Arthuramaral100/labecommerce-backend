import { TPerson, TProduct, TPurchase } from "./types";

export const users: TPerson[] = [
    {
        id: "a001",
        email:"arthurzinho@gmail.com",
        password:"3010arthur"
    },
    {
        id:"a002",
        email:"brendinhacfc@gmail.com",
        password:"1906brenda"
    }
]

export const products: TProduct[] = [
    {
        id:"p001",
        name:"POP! Darth Vader",
        price: 200,
        category:"Sith"
    },
    {
        id:"p002",
        name:"POP! Princesa Leia",
        price: 200,
        category:"Rebels"
    }
]

export const purchases: TPurchase[] = [
    {
        userId:"a001",
        productId:"p001",
        quantity:2,
        totalPrice:400
    },
    {
        userId:"a002",
        productId:"p002",
        quantity:3,
        totalPrice:600
    }
]