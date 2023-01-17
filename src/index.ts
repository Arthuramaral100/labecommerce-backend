
import {users, products, purchases} from "./database"
import express, {Request, Response} from "express"
import cors from "cors"

// console.log("O aplicativo está funcionando");
// console.table(users)
// console.table(products)
// console.table(purchases)

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
  })

app.get("/users", (req: Request, res: Response)=> {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response)=>{
    res.status(200).send(products)
})

app.get("/product/search", (req: Request, res: Response) =>{
    const q = req.query.q as string

    const result = products.filter((product)=>{
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response)=>{
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser = {
        id, 
        email,
        password
    }

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})

app.post("/products", (req: Request, res: Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as string

    const newProduct = {
        id, 
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastro com sucesso")
})

app.post("/purchases", (req: Request, res: Response) =>{
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    const newPurchase = {
        userId, 
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
} )

app.get("/product/:id", (req: Request, res: Response) =>{
    const id = req.params.id as string

    const result = products.filter((product)=>{
        return product.id.includes(id)
    })

    res.status(200).send(result)
})

app.get("/users/:id/purchases", (req: Request, res: Response) =>{
    const id = req.params.id as string

    const result = purchases.filter((purchase)=>{
        return purchase.userId.includes(id)
    })

    res.status(200).send(result)
})

app.delete("/users/:id", (req: Request, res: Response)=>{
    
    const id = req.params.id as string
    
    const userIndex = users.findIndex((user) => user.id === id)

        if (userIndex >= 0) {
        users.splice(userIndex, 1)
        }
        
    res.status(200).send("User apagado com sucesso")
})

app.delete("/products/:id", (req: Request, res: Response)=>{
    
    const id = req.params.id as string
    
    const productIndex = products.findIndex((product) => product.id === id)

        if (productIndex >= 0) {
        products.splice(productIndex, 1)
        }

    res.status(200).send("Produto apagado com sucesso")
})

app.put("/users/:id", (req: Request, res: Response)=>{
    const id = req.params.id as string
    const newEmail = req.body.email as string | undefined
    const newpassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id) 

    if (user) {
        user.email = newEmail || user.email as string
        user.password = newpassword || user.password as string
    }

    res.status(200).send("Cadastro atualizado com sucesso")
})

app.put("/products/:id", (req: Request, res: Response)=>{
    const id = req.params.id
    const newName = req.params.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as string | undefined

    const product = products.find((product) => product.id === id) 

    if (product) {
        product.name = newName || product.name as string
        product.price = newPrice || product.price as number
        product.category = newCategory || product.category as string
    }

    res.status(200).send("Produto atualizado com sucesso")
})