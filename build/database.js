"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "a001",
        email: "arthurzinho@gmail.com",
        password: "3010arthur"
    },
    {
        id: "a002",
        email: "brendinhacfc@gmail.com",
        password: "1906brenda"
    }
];
exports.products = [
    {
        id: "p001",
        name: "POP! Darth Vader",
        price: 200,
        category: "Sith"
    },
    {
        id: "p002",
        name: "POP! Princesa Leia",
        price: 200,
        category: "Rebels"
    }
];
exports.purchases = [
    {
        userId: "a001",
        productId: "p001",
        quantity: 2,
        totalPrice: 400
    },
    {
        userId: "a002",
        productId: "p002",
        quantity: 3,
        totalPrice: 600
    }
];
//# sourceMappingURL=database.js.map