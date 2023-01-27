
// import {users, products, purchases} from "./database"
import express, {Request, Response} from "express"
import cors from "cors"
import { db } from "./database/knex"
import { TPerson, TProduct, TPurchase } from "./types"
import { userInfo } from "os"

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
// GET ALL USERS (TAMBÉM ÉPOSSÍVEL FAZER A BUSCA POR QUERY PARAMS DE UM USER ESPECÍFICO)
app.get("/users", async (req: Request, res: Response)=> {
    try {
        const searchTerm = req.query.q

        if(searchTerm === undefined){
            const result = await db("users")
            res.status(200).send(result)
        } else{
            const result: TPerson[] = await db("users").where("name", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }

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
// GET ALL PRODUCTS (TAMBÉM ÉPOSSÍVEL FAZER A BUSCA POR QUERY PARAMS DE UM PRODUTO ESPECÍFICO)
app.get("/products", async (req: Request, res: Response)=>{
    try {
        const searchTerm = req.query.q

        if(searchTerm === undefined){
            const result = await db("products")
            res.status(200).send(result)
        } else{
            const result: TProduct[] = await db("products").where("name", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }

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
// POST USER (CADASTRO DE UM NOVO USER)
app.post("/users", async (req: Request, res: Response)=>{
    try {
    
    const {id, name, email, password} = req.body
    
    if(typeof id === undefined) {
        res.status(400)
        throw new Error("'id' não preenchido");
    }

    if(id[0] !== "a"){
        res.status(400)
        throw new Error("'id' inválido, deve iniciar com a letra 'a'");
        
    }
    
    if(typeof email === undefined) {
        res.status(400)
        throw new Error("'email' não preenchido");
    }

    if(typeof name === undefined) {
        res.status(400)
        throw new Error("'name' não preenchido");
    }

    if(typeof password === undefined) {
        res.status(400)
        throw new Error("'password' não preenchido");
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
        throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
    }

    const [userIdAlreadyExist]: TPerson[] = await db("users").where({id})
    const [userEmailAlreadyExist]: TPerson[] = await db("users").where({email})
    
    if (userIdAlreadyExist) {
        res.status(400)
        throw new Error("'id' já existente no banco de dados");
    }

    if (userEmailAlreadyExist) {
        res.status(400)
        throw new Error("'email' já existente no banco de dados");
    }

    const newUser: TPerson = {
        id,
        name, 
        email, 
        password
    }

    await db("users").insert(newUser)

    res.status(200).send({message: "Cadastro realizado com sucesso"})

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
// POST PRODUCT (CADASTRO DE UM NOVO PRODUTO)
app.post("/products", async (req: Request, res: Response)=>{
    
    try {
    const {id, name, price, description, imageURL} = req.body
    
    if(typeof id === undefined) {
        res.status(400)
        throw new Error("'id' não preenchido");
    }

    if(id[0] !== "p"){
        res.status(400)
        throw new Error("'id' inválido, deve iniciar com a letra 'p'");
        
    }

    if(typeof name === undefined) {
        res.status(400)
        throw new Error("'name' não preenchido");
    }

    if(typeof price === undefined) {
        res.status(400)
        throw new Error("'price' não preenchido");
    }

    if(typeof price !== "number") {
        res.status(400)
        throw new Error("'price' deve ser um number");
    }

    if(typeof description === undefined) {
        res.status(400)
        throw new Error("'description' não preenchido");
    }

    if(typeof imageURL === undefined) {
        res.status(400)
        throw new Error("'imageURL' não preenchido");
    }
    
    const productsIdAlreadyExist = await db("products").where({id})

    if (productsIdAlreadyExist) {
        res.status(400)
        throw new Error("'id' já existente no banco de dados");
    }

    const newProduct: TProduct = {
        id,
        name,
        price,
        description,
        imageURL
    }

    await db("products").insert(newProduct)

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
// PUT PRODUCT (EDITAR PRODUTO)
app.put("/products/:id", async (req: Request, res: Response)=>{
    
    try {
        const idToUpdate = req.params.id
        const newName = req.params.name as string 
        const newPrice = req.body.price as number 
        const newDescription = req.body.description as string 
        const NewImageUrl = req.body.imageURL as string 
    
        if (typeof idToUpdate === "string") {
            if (idToUpdate[0] !== "p") {
                res.status(400)
                throw new Error("'id' inválido, deve começar com letra 'p'");

            }
        } else{
            res.status(400)
            throw new Error("'id' deve ser 'string'");
            
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma 'string'");
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'description' deve ser uma 'string'");
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "string") {
                res.status(400)
                throw new Error("'price' deve ser uma 'string'");
            }
        }

        if (NewImageUrl !== undefined) {
            if (typeof NewImageUrl !== "number") {
                res.status(400)
                throw new Error("'imageUrl' deve ser uma 'string'");
            }
        }
        
        const [product] = await db("products").where({id: idToUpdate})

        if (!product) {
            res.status(404)
            throw new Error("Id inválido, não encontrado no banco de dados.");
        }

        const newProduct = {
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            imageURL: NewImageUrl || product.imageURL

        }

        await db("products").update(newProduct).where({ id: idToUpdate })

        res.status(200).send({message: "Produto atualizado com sucesso"})
        
    } catch (error) {
        console.log(error);
    if(res.statusCode === 200){
        res.status(500)
    }
        res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------
// PUT USER (EDITAR USER)

app.put("/users/:id", async (req: Request, res: Response)=>{

    try {
        const idToUpdate = req.params.id as string
        const newEmail = req.body.email as string
        const newPassword = req.body.password as string 
        const newName = req.body.name as string 

        if (typeof idToUpdate === "string") {
            if (idToUpdate[0] !== "a") {
                res.status(400)
                throw new Error("'id' inválido, deve começar com letra 'a'");

            }
        } else{
            res.status(400)
            throw new Error("'id' deve ser 'string'");
            
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("'name' deve ser uma 'string'");
            }
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error("'email' deve ser uma 'string'");
            }
        }

        if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }
    
        const [user] = await db("users").where({id: idToUpdate})

        if (!user) {
            res.status(404)
            throw new Error("Id inválido, não encontrado no banco de dados.");
        }

        const newUser = {
            name: newName || user.name,
            email: newEmail || user.price,
            password: newPassword || user.description
            

        }

        await db("users").update(newUser).where({ id: idToUpdate })

        res.status(200).send({message: "User atualizado com sucesso"})
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.post("/purchases", async (req: Request, res: Response) =>{
    
    try {

    const {id, buyerId, totalPrice, paid, productId, quantity} = req.body

    if(typeof id === undefined) {
        res.status(400)
        throw new Error("Id não preenchido");
    }
    if(id[0] !== "c"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'c'");
        
    }

    if(typeof buyerId === undefined) {
        res.status(400)
        throw new Error("Id do user não preenchido");
    }

    if(buyerId[0] !== "a"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'a'");
        
    }

    if(typeof productId === undefined) {
        res.status(400)
        throw new Error("Id do produto não preenchido");
    }
    if(productId[0] !== "p"){
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

    if(typeof quantity === undefined) {
        res.status(400)
        throw new Error("paid não preenchido");
    }
    if(typeof quantity !== "number") {
        res.status(400)
        throw new Error("paid deve ser um number");
    }
    
    if(typeof totalPrice === undefined) {
        res.status(400)
        throw new Error("totalPrice não preenchido");
    }
    if(typeof totalPrice !== "number") {
        res.status(400)
        throw new Error("totalPrice deve ser um number");
    }

        const user = await db("users").where({id: buyerId})

        const product =  await db("products").where({id: productId})

    if (!user) {
        res.status(404)
        throw new Error("Id do user não encontrado no banco de dados, verifique se o id está cadastrado corretamente");
    }

    if (!product) {
        res.status(404)
        throw new Error("Id do produto não encontrado no banco de dados, verifique se o id está cadastrado corretamente");
    }

    const newPurchase = {
        id,
        buyer_id: buyerId,
        total_price: totalPrice,
        paid
    }

    const newPurchaseProduct = {
        purchase_id: id,
        product_id: productId,
        quantity
    }
    await db("purchases").insert(newPurchase)
    await db("purchases_products").insert(newPurchaseProduct)

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

app.delete("/purchases/:id", async (req: Request, res: Response)=>{
    try {
        const id = req.params.id as string
        
        if (id === undefined) {
            res.status(400)
            throw new Error("'id' não informada");
            
        }

        if(id[0] !== "c"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'c'");
            
        }

        const [purchase]: TPurchase[] = await db("purchases").where({id})


        if (!purchase) {
            res.status(404)
            throw new Error("Purchase não encontrado");
        } 
          
        await db("purchases_products").del().where({purchase_id: id})
        await db("purchases").del().where({id})
        res.status(200).send("Purchase apagado com sucesso")
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/purchases", async (req: Request, res: Response)=>{
    try {
        const purchases: TPurchase[] = await db("purchases")

        const result = []

        for(let purchase of purchases){
            const products = []
            const [user]: TPerson[] = await db("users").where({id: purchase.buyer_id})
            const purchasesProducts= await db("purchases_products").where({purchase_id : purchase.id})
            for(let purchaseProduct of purchasesProducts){
                const [product]: TProduct[] = await db("products").where({id: purchaseProduct.product_id})
                const quantity = purchaseProduct.quantity
                products.push({
                    ... product ,
                    quantity
                })
            }

            result.push({user, purchase, products})
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



