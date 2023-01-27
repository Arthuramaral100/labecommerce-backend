-- Active: 1674062373523@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
    );

DROP TABLE users;
------------------------------------------------------------------------------

INSERT INTO
    users(id, name, email, password)
VALUES (
        "a001",
        "João",
        "joazinho@gmail.com",
        "joazinho123"
    ), (
        "a002",
        "Arthur",
        "arthur@gmail.com",
        "arthur3010"
    ), (
        "a003",
        "Brenda",
        "brendacfc@gmail.com",
        "1906brenda"
    );

------------------------------------------------------------------------------

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        imageURL TEXT NOT NULL 
    );

DROP TABLE products;
------------------------------------------------------------------------------

INSERT INTO
    products (id, name, price, description, imageURL)
VALUES ( "p001","POP! Darth Vader",220,"Sith", "imagem darth vader"), 
        ("p002", "POP! Princesa Leia",200, "Rebels","imagem princesa leia"), 
        ("p003","POP! Han Solo",200,"Rebels","imagem han solo"), 
        ("p004","POP! Yoda",180, "Jedi","imagem yoda"), 
        ("p005","POP! Kylo Ren",220,"Sith","imagem kylo ren"), 
        ("p006","POP! Imperador Palpatine",200, "Sith", "imagem imperador"), 
        ("p007", "POP! Rey", 200, "Jedi", "imagem rey"), 
        ("p008","LightSaber Azul", 150,"Jedi", "imagem lightsaber azul"), 
        ("p009","LightSaber Verde",150,"Jedi", "imagem lightsaber verde"), 
        ("p010","LightSaber Vermelho",150,"Sith", "imagem lightsaber vermelho"), 
        ("p011","Nave Millennium Falcom - Metal",280,"Rebels", "imagem millennium"), 
        ("p012","Nave Star Destroyer - Metal",280,"Sith", "imagem star destroyer"), 
        ("p013","Nave X-Wing Star Figther - Metal",250,"Rebels", "imagem x-wing"), 
        ("p014","Nave Imperial TIE Fighter - Metal",250,"Sith", "imagem tie fighter"), 
        ("p015","C3PO & R2-D2 - Metal",280,"Rebels", "imagem c3po");

------------------------------------------------------------------------------

SELECT * FROM users;

------------------------------------------------------------------------------

SELECT * FROM products;

------------------------------------------------------------------------------

SELECT * FROM products WHERE name = "LightSaber Azul";

------------------------------------------------------------------------------

INSERT INTO
    users (id, name, email, password)
VALUES (
        "a004",
        "Suelen",
        "susu@gmail.com",
        "susu12345"
    );

------------------------------------------------------------------------------

INSERT INTO
    products (id, name, price, description, imageURL)
VALUES (
        "p016",
        "POP! Dark Rey",
        220,
        "Sith",
        "imagem dark rey"
    ), (
        "p017",
        "POP! Luke SkyWalker",
        200,
        "Jedi",
        "imagem luke"
    ), (
        "p018",
        "Máscara Darth Vader",
        150,
        "Sith",
        "imagem mascara darth vader"
    ), (
        "p019",
        "LightSaber Roxo",
        180,
        "Jedi",
        "imagem lightsaber roxo"
    ), (
        "p020",
        "POP! Poe Dameron",
        200,
        "Rebels",
        "imagem poe"
    ), (
        "p021",
        "POP! Stormtrooper",
        180,
        "Sith",
        "imagem stormtrooper"
    );

------------------------------------------------------------------------------

SELECT * FROM products WHERE id = "p013";

------------------------------------------------------------------------------

DELETE FROM users WHERE id = "a004";

------------------------------------------------------------------------------

DELETE FROM products WHERE id = "p016";

------------------------------------------------------------------------------

UPDATE users
SET
    email = "arthuramaral57@gmail.com"
WHERE id = "a002";

------------------------------------------------------------------------------

UPDATE products SET price = 200 WHERE id = "p004";

------------------------------------------------------------------------------

SELECT * FROM users ORDER BY email ASC;

------------------------------------------------------------------------------

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

------------------------------------------------------------------------------

SELECT *
FROM products
WHERE price > 200 AND price < 300
ORDER BY price ASC;

------------------------------------------------------------------------------

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer_id TEXT NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users (id)
    );

DROP TABLE purchases;
------------------------------------------------------------------------------
SELECT * FROM purchases;

DELETE FROM purchases;

------------------------------------------------------------------------------

INSERT INTO
    purchases (id, buyer_id, total_price, paid )
VALUES ("c001", "a001", 400, 0), 
("c002", "a001", 350, 0), 
("c003", "a002", 550, 0), 
("c004", "a002", 200, 0), 
("c005", "a003", 280, 0), 
("c006", "a003",  440, 0);

------------------------------------------------------------------------------

SELECT *
FROM users
    INNER JOIN purchases ON users.id = purchases.buyer_id;

------------------------------------------------------------------------------

SELECT *
FROM users
    INNER JOIN purchases ON users.id = "a002" AND buyer_id = "a002";

------------------------------------------------------------------------------

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

------------------------------------------------------------------------------

INSERT INTO
    purchases_products(purchase_id, product_id, quantity)
VALUES  ("c001", "p017", 3), 
        ("c002", "p002", 2), 
        ("c003", "p010", 3), 
        ("c004", "p005", 2), 
        ("c005", "p013", 1),
        ("c006", "p008", 2);

------------------------------------------------------------------------------
SELECT * FROM purchases_products;

DELETE FROM purchases_products;

------------------------------------------------------------------------------

SELECT * FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id