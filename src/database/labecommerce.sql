-- Active: 1674062373523@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users(id, email, password)
VALUES ("a001", "joazinho@gmail.com", "joazinho123"),
        ("a002", "arthur@gmail.com", "arthur3010"),
        ("a003", "brendacfc@gmail.com", "1906brenda");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    category TEXT NOT NULL
);

INSERT INTO products
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
        ("p015", "C3PO & R2-D2 - Metal", 280, "Rebels")