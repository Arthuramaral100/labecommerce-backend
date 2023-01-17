import { TPerson, TProduct, TPurchase } from "./types";

enum categorys {
    SITH = "Sith",
    REBELS = "Rebels"
}

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
        category: categorys.SITH
    },
    {
        id:"p002",
        name:"POP! Princesa Leia",
        price: 200,
        category:categorys.REBELS
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
