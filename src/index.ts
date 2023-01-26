
// import {users, products, purchases} from "./database"
import express, {Request, Response} from "express"
import cors from "cors"
import { db } from "./database/knex"
import { TPerson, TProduct, TPurchase } from "./types"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
  })

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/users", async (req: Request, res: Response)=> {
    try {

        const result  = await db.raw(`
            SELECT * FROM users;
        `)

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/products", async (req: Request, res: Response)=>{
    try {

        const result = await db.raw(`
            SELECT * FROM products
        `)
        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/product/search", async (req: Request, res: Response) =>{
    try {
    const q = req.query.q as string
    
    if (q.length < 1) {
        res.status(400)
        throw new Error("Produto inválido, o termo pesquisado deve ter pelo menos um caractere");
    }

    const [ result ] = await db.raw(`
        SELECT * FROM products
        WHERE name = "${q}";
    `)
    
    if (!result) {
        res.status(404)
        throw new Error("Produto não encontrado");
        
    }
    
    res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
   
})

//----------------------------------------------------------------------------------------------------------------------------------

app.post("/users", async (req: Request, res: Response)=>{
    try {
    
    const {id, name, email, password} = req.body
    
    if(typeof id === undefined) {
        res.status(400)
        throw new Error("Id não preenchido");
    }

    if(id[0] !== "a"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'a'");
        
    }
    
    if(typeof email === undefined) {
        res.status(400)
        throw new Error("Email não preenchido");
    }

    if(typeof name === undefined) {
        res.status(400)
        throw new Error("Name não preenchido");
    }

    if(typeof password === undefined) {
        res.status(400)
        throw new Error("Password não preenchido");
    }

    const users = await db.raw(`
        SELECT * FROM users
    `)

    if (users.find((user: TPerson) =>{user.id === id || user.email === email})) {
        res.status(400)
        throw new Error("Id ou Email já existente no banco de dados");
    }

    await db.raw(`
        INSERT INTO users(id, name, email, password)
        VALUES("${id}", "${name}", "${email}", "${password}")
    `)

    res.status(200).send("Usuário cadastrado com sucesso")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

//----------------------------------------------------------------------------------------------------------------------------------

app.post("/products", async (req: Request, res: Response)=>{
    
    try {
    const {id, name, price, category, imageURL} = req.body
    
    if(typeof id === undefined) {
        res.status(400)
        throw new Error("Id não preenchido");
    }

    if(id[0] !== "p"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'p'");
        
    }

    if(typeof name === undefined) {
        res.status(400)
        throw new Error("Name não preenchido");
    }

    if(typeof price === undefined) {
        res.status(400)
        throw new Error("Price não preenchido");
    }

    if(typeof price !== "number") {
        res.status(400)
        throw new Error("Price deve ser um number");
    }

    if(typeof category === undefined) {
        res.status(400)
        throw new Error("Category não preenchido");
    }

    if(typeof imageURL === undefined) {
        res.status(400)
        throw new Error("Category não preenchido");
    }
    
    const products = await db.raw(`
        SELECT * FROM products
    `)

    if (products.find((product: TProduct)=> product.id === id)) {
        res.status(400)
        throw new Error("Id já existente no banco de dados");
    }

    await db.raw(`
        INSERT INTO products(id, name, price, category, imageURL)
        VALUES("${id}", "${name}", "${price}", "${category}", "${imageURL}")
    `)

    res.status(201).send("Produto cadastro com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

//----------------------------------------------------------------------------------------------------------------------------------

app.post("/purchases", async (req: Request, res: Response) =>{
    
    try {

    const {id, total_price, paid, buyer_id, product_id } = req.body

    if(typeof id === undefined) {
        res.status(400)
        throw new Error("Id não preenchido");
    }
    if(id[0] !== "c"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'c'");
        
    }

    if(typeof buyer_id === undefined) {
        res.status(400)
        throw new Error("Id do user não preenchido");
    }

    if(buyer_id[0] !== "a"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'a'");
        
    }

    if(typeof product_id === undefined) {
        res.status(400)
        throw new Error("Id do produto não preenchido");
    }
    if(product_id[0] !== "p"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'p'");
        
    }

    if(typeof paid === undefined) {
        res.status(400)
        throw new Error("paid não preenchido");
    }
    if(typeof paid !== "number") {
        res.status(400)
        throw new Error("paid deve ser um number");
    }
    
    if(typeof total_price === undefined) {
        res.status(400)
        throw new Error("totalPrice não preenchido");
    }
    if(typeof total_price !== "number") {
        res.status(400)
        throw new Error("totalPrice deve ser um number");
    }

        const users = await db.raw(`
            SELECT * FROM users
            WHERE id = "${buyer_id}";
        `)

        const products = await db.raw(`
        SELECT * FROM products
        WHERE id = "${product_id}";
    `)

    if (users.length === 0) {
        res.status(404)
        throw new Error("Id do user não encontrado no banco de dados, verifique se o id está cadastrado corretamente");
    }

    if (products.length === 0) {
        res.status(404)
        throw new Error("Id do produto não encontrado no banco de dados, verifique se o id está cadastrado corretamente");
    }

    
    await db.raw(`
        INSERT INTO purchases(id, total_price, paid, buyer_id, product_id)
        VALUES("${id}", "${total_price}", "${paid}", "${buyer_id}", "${product_id}");
    `)

    res.status(201).send("Compra realizada com sucesso")
    
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
} )

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/product/:id", async (req: Request, res: Response) =>{
    
    try {
        const id = req.params.id as string
        
        if(typeof id === undefined) {
            res.status(400)
            throw new Error("Id não preenchido");
        }

        if(id[0] !== "p"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'p'");
            
        }
        const result = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
    `)
    
        if (!result) {
            res.status(404)
            throw new Error("Produto não encontrado, verifique se o id está cadastrado");
            
        }
    
        res.status(200).send(result)
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/users/:id/purchases", async (req: Request, res: Response) =>{
    try {
        const id = req.params.id as string
        
        if(typeof id === undefined) {
            res.status(400)
            throw new Error("Id não preenchido");
        } 

        if(id[0] !== "a"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'a'");
            
        }

        const result = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${id}";
    `)

        if (!result) {
            res.status(404)
            throw new Error("User não encontrado, verifique se o id está cadastrado");
            
        }
    
        res.status(200).send(result)
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.delete("/users/:id", async (req: Request, res: Response)=>{
    try {
        const id = req.params.id as string
        
        if(id[0] !== "a"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'a'");
            
        }

        const users = await db.raw(`
        SELECT * FROM users
    `)
        const userIndex = users.findIndex((user: TPerson) => user.id === id)

        if (typeof userIndex === undefined) {
            res.status(404)
            throw new Error("User não encontrado");
        } else{
            await db.raw(`
                DELETE FROM users
                WHERE id = "${id}";
            `)
        }
            
        res.status(200).send("User apagado com sucesso")
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.delete("/products/:id", async(req: Request, res: Response)=>{
    try {
        const id = req.params.id as string

        if(id[0] !== "p"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'p'");
            
        }

        const products = await db.raw(`
        SELECT * FROM products
    `)
        
        const productIndex = products.findIndex((product: TProduct) => product.id === id)
        
        if (typeof productIndex === undefined) {
            res.status(404)
            throw new Error("Produto não encontrado");
        } else {
            await db.raw(`
                DELETE FROM products
                WHERE id = "${id}";
            `)
        }
    
        res.status(200).send("Produto apagado com sucesso")
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.put("/users/:id", async (req: Request, res: Response)=>{

    try {
        const id = req.params.id as string
        const newEmail = req.body.email as string
        const newpassword = req.body.password as string 
        const newName = req.body.name as string 

        if(id[0] !== "a"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'a'");
            
        }

        const user = await db.raw(`
        SELECT * FROM users
        WHERE id = "${id}";
    `)
        
        if (!user) {
            res.status(404)
            throw new Error("User não encontrado, verifique o id");
            
        }

        if (typeof newEmail !== "string" ) {
            res.status(400)
            throw new Error("O email deve ser uma string e não pode estar vazio");
            
        }

        if (typeof newpassword !== "string" ) {
            res.status(400)
            throw new Error("Password deve ser uma string e não pode estar vazio");
            
        }

        
        if (user) {
            await db.raw(`
                UPDATE users
                SET email = "${newName}" || "${user.name}",
                SET email = "${newEmail}" || "${user.email}",
                    password = "${newpassword}" || "${user.password}"
                WHERE id = "${id}";
            `)
        }
    
        res.status(200).send("Cadastro atualizado com sucesso")
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error)
    }
})

// //----------------------------------------------------------------------------------------------------------------------------------

app.put("/products/:id", async (req: Request, res: Response)=>{
    
    try {
        const id = req.params.id
        const newName = req.params.name as string 
        const newPrice = req.body.price as number 
        const newCategory = req.body.category as string 
        const NewImageUrl = req.body.imageURL as string 
    
        if(id[0] !== "p"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'p'");
            
        }

        const product = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
    `)

    
        if (!product) {
            res.status(404)
            throw new Error("Produto não encontrado, verifique o id");
        }
    
        if (typeof newName !== "string" ) {
            res.status(400)
            throw new Error("Novo name deve ser uma string e não pode estar vazio");
            
        }

        if (typeof newPrice !== "number" ) {
            res.status(400)
            throw new Error("Novo preço deve ser uma string e não pode estar vazio");
            
        }

        if (typeof newCategory !== "string" ) {
            res.status(400)
            throw new Error("Nova categoria deve ser uma string e não pode estar vazio");
            
        }

        if (product) {
            await db.raw(`
                UPDATE products 
                SET name = "${newName}" || "${product.name}",
                    price = "${newPrice}" || "${product.price}",
                    category = "${newCategory}" || "${product.category}",
                    imageURL = "${NewImageUrl}" || "${product.imageURL}"
                    WHERE id: "${id}";
            `)
        }
        res.status(200).send("Produto atualizado com sucesso")
        
    } catch (error) {
        console.log(error);
    if(res.statusCode === 200){
        res.status(500)
    }
        res.send(error)
    }
})