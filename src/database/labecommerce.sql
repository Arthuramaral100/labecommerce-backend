-- Active: 1674062373523@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

------------------------------------------------------------------------------

INSERT INTO users(id, email, password)
VALUES ("a001", "joazinho@gmail.com", "joazinho123"),
        ("a002", "arthur@gmail.com", "arthur3010"),
        ("a003", "brendacfc@gmail.com", "1906brenda");

------------------------------------------------------------------------------

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    category TEXT NOT NULL
);

------------------------------------------------------------------------------

INSERT INTO products (id, name, price, category)
VALUES("p001", "POP! Darth Vader", 220, "Sith"),
        ("p002", "POP! Princesa Leia", 200, "Rebels"),
        ("p003", "POP! Han Solo", 200, "Rebels"),
        ("p004", "POP! Yoda", 180, "Jedi"),
        ("p005", "POP! Kylo Ren", 220, "Sith"),
        ("p006", "POP! Imperador Palpatine", 200, "Sith"),
        ("p007", "POP! Rey", 200, "Jedi"),
        ("p008", "LightSaber Azul", 150, "Jedi"),
        ("p009", "LightSaber Verde", 150, "Jedi"),
        ("p010", "LightSaber Vermelho", 150, "Sith"),
        ("p011", "Nave Millennium Falcom - Metal", 280, "Rebels"),
        ("p012", "Nave Star Destroyer - Metal", 280, "Sith"),
        ("p013", "Nave X-Wing Star Figther - Metal", 250, "Rebels"), 
        ("p014", "Nave Imperial TIE Fighter - Metal", 250, "Sith"),
        ("p015", "C3PO & R2-D2 - Metal", 280, "Rebels");

------------------------------------------------------------------------------

SELECT * FROM users;

------------------------------------------------------------------------------

SELECT * FROM products;

------------------------------------------------------------------------------

SELECT * FROM products
WHERE name = "LightSaber Azul";

------------------------------------------------------------------------------

INSERT INTO users (id, email, password)
VALUES ("a004", "susu@gmail.com", "susu12345");

------------------------------------------------------------------------------

INSERT INTO products (id, name, price, category)
VALUES ("p016", "POP! Dark Rey", 220, "Sith"),
        ("p017", "POP! Luke SkyWalker", 200, "Jedi"),
        ("p018", "Máscara Darth Vader", 150, "Sith"),
        ("p019", "LightSaber Roxo", 180, "Jedi"),
        ("p020", "POP! Poe Dameron", 200, "Rebels"),
        ("p021", "POP! Stormtrooper", 180, "Sith")
;

------------------------------------------------------------------------------

SELECT * FROM products
WHERE id = "p013";

------------------------------------------------------------------------------

DELETE FROM users
WHERE id = "a004";

------------------------------------------------------------------------------

DELETE FROM products
WHERE id = "p016";

------------------------------------------------------------------------------

UPDATE users
SET email = "arthuramaral57@gmail.com"
WHERE id = "a002";

------------------------------------------------------------------------------

UPDATE products
SET price = 200
WHERE id = "p004";
------------------------------------------------------------------------------

SELECT * FROM users
ORDER BY email ASC;

------------------------------------------------------------------------------

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;

------------------------------------------------------------------------------

SELECT * FROM products
WHERE price > 200 AND price < 300
ORDER BY price ASC;

------------------------------------------------------------------------------

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

------------------------------------------------------------------------------

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES ("b001", 400, 0, "a001"),
        ("b002", 350, 0, "a001"),
        ("b003", 550, 0, "a002"),
        ("b004", 200, 0, "a002"),
        ("b005", 280, 0, "a003"),
        ("b006", 440, 0, "a003");

------------------------------------------------------------------------------

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "b005";

------------------------------------------------------------------------------

SELECT * FROM users
INNER JOIN purchases
ON users.id = purchases.buyer_id;

------------------------------------------------------------------------------

SELECT * FROM users
INNER JOIN purchases
ON users.id = "a002" AND buyer_id = "a002";

------------------------------------------------------------------------------

