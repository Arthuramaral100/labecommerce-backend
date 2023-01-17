# labecommerce-backend

    Olá! bem vindo a documentação da API do projeto labecommerce da Labenu. Este projeto foi desenvolvido no módulo back-end do bootcamp da labenu, /utilizando tecnologias como Javascript, Typescript, Express, MySQL e SQLite.
    
    Nessa API você acessará um banco de dados de um labecommerce, contendo usuários(users) cadastrados, produtos(products) e pedidos(purchases). Você também poderá popular o banco de dados e editar os dados cadastrados.

    Abaixo alguns endpoints e orientações para a utilização da API:

# Endpoints


## GET AllUsers
    
    http://localhost:3003/users

    Endpoint para visualizar todos os usuários cadastrados no banco de dados.


## GET AllProducts

    http://localhost:3003/products

    Endpoint para visualizar todos os produtos cadastrados no banco de dados.


## GET Product

    http://localhost:3003/product/search?q=

    Endpoint para buscar produtos que incluem, em seu nome, a query informada(a palavra-chave deve ser informada logo após o simbolo =(igual) no link da endpoint) .


## POST NewUser

    http://localhost:3003/users

    Endpoint para o cadastro de um novo usuário. O usuário deve ter OBRIGATORIAMENTE:

        - id: começando com a letra 'a' e com três números depois da letra. ex: "a001", "a002" ;
        - email ;
        - password
    
    * Todos deve ser uma string, devem estar em parenteses.


## POST NewProduct

    http://localhost:3003/products

    Endpoint para o cadastro de um novo produto. O produto deve ter OBRIGATORIAMENTE:

        - id: começando com a letra 'p' e com três números depois da letra. ex: "p001", "p002" ;

        - name: deve ser uma string, deve estar em parenteses ;

        - price: deve ser um number, portanto não é necessário colocar em parenteses ;

        - category: deve ser uma string, deve estar em parenteses .


## POST NewPurchase

    http://localhost:3003/purchases

    Endpoint para o cadastro de um novo pedido. Os dados devem ser preenchidos no body. O pedido deve ter OBRIGATORIAMENTE:

        - userId: deve ser um id válido existente no banco de dados, o user deve estar cadastrado para fazer um pedido. Seguindo o modelo do id do user. ex: "a001", "a002" ;

        - productId: deve ser um id válido existente no banco de dados, o produto deve estar cadastrado para fazer um pedido. Seguindo o modelo do id do produto. ex: "p001", "p002" ;

        - quantity: deve ser um number, portanto não é necessário colocar em parenteses ;

        - totalPrice: deve ser um number, portanto não é necessário colocar em parenteses .


## GET ProductById

    http://localhost:3003/product/:id

    Endpoint para buscar produto por id. Substitua ":id" no link do endpoint pelo id do produto procurado. O id deve estar cadastrado no banco de dados e segue o modelo do id do produto. ex: "p001", "p002" .


## GET UserPurchasesByUserId

    http://localhost:3003/users/:id/purchases

    Endpoint para buscar pedidos feitos pelo usuário. A busca é feita pelo id do usuário. Substitua ":id" no link do endpoint pelo id do user. O id deve estar cadastrado no banco de dados e segue o modelo do id do user. ex: "a001", "a002" .


## DELETE DeleteUserById

    http://localhost:3003/users/:id

    Endpoint para deletar user cadastrado no banco de dados pela id. Substitua ":id" no link do endpoint pelo id do user que deseja deletar. O id deve seguir o modelo do id do user. ex: "a001", "a002" .


## DELETE DeleteProductById

    http://localhost:3003/products/:id

    Endpoint para deletar produto cadastrado no banco de dados pela id. Substitua ":id" no link do endpoint pelo id do produto que deseja deletar. O id deve seguir o modelo do id do produto. ex: "p001", "p002" .


## PUT EditUserById

    http://localhost:3003/users/:id

    Endpoint para editar user já cadastrado no banco de dados. Substitua ":id" no link do endpoint pelo id do user que deseja editar. O id deve seguir o modelo do id do user. ex: "a001", "a002" .

    * Somente o email e a password do user podem ser editados, seguindo o modelo de cadastro de user.


## PUT EditProductById

    http://localhost:3003/products/:id

    Endpoint para editar produto já cadastrado no banco de dados. Substitua ":id" no link do endpoint pelo id do produto que deseja editar. O id deve seguir o modelo do id do produto. ex: "p001", "p002" .

    * Somente name, price e category do produto podem ser editados, seguindo o modelo de cadastro de produto.



