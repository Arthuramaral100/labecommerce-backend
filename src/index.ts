
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

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
  })

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/users", (req: Request, res: Response)=> {
    try {
        res.status(200).send(users)
    } catch (error) {
        console.log(error);
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/products", (req: Request, res: Response)=>{
    try {
        res.status(200).send(products)
    } catch (error) {
        console.log(error);
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/product/search", (req: Request, res: Response) =>{
    try {
    const q = req.query.q as string
    if (q.length < 1) {
        res.status(400)
        throw new Error("Produto inválido, o termo pesquisado deve ter pelo menos um caractere");
    }

    const result = products.filter((product)=>{
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    if (!result) {
        res.status(404)
        throw new Error("Produto não encontrado");
        
    }
    
    res.status(200).send(result)

    } catch (error) {
    console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message)
    }
   
})

//----------------------------------------------------------------------------------------------------------------------------------

app.post("/users", (req: Request, res: Response)=>{
    try {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string
    
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

    if(typeof password === undefined) {
        res.status(400)
        throw new Error("Password não preenchido");
    }

    const newUser = {
        id, 
        email,
        password
    }

    if (users.filter((user)=> user.id === newUser.id)) {
        res.status(400)
        throw new Error("Id já existente no banco de dados");
    }

    if (users.filter((user)=> user.email === newUser.email)) {
        res.status(400)
        throw new Error("Email já existente no banco de dados");
    }

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")

    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message)
    }
    
})

//----------------------------------------------------------------------------------------------------------------------------------

app.post("/products", (req: Request, res: Response)=>{
    
    try {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as string
    
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
    
    const newProduct = {
        id, 
        name,
        price,
        category
    }

    if (products.find((product)=> product.id === newProduct.id)) {
        res.status(400)
        throw new Error("Id já existente no banco de dados");
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastro com sucesso")
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message)
    }
    
})

//----------------------------------------------------------------------------------------------------------------------------------

app.post("/purchases", (req: Request, res: Response) =>{
    
    try {
        const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    if(typeof userId === undefined) {
        res.status(400)
        throw new Error("Id do user não preenchido");
    }
    if(userId[0] !== "a"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'p'");
        
    }

    if(typeof productId === undefined) {
        res.status(400)
        throw new Error("Id do produto não preenchido");
    }
    if(productId[0] !== "p"){
        res.status(400)
        throw new Error("Id inválido, deve iniciar com a letra 'p'");
        
    }

    if(typeof quantity === undefined) {
        res.status(400)
        throw new Error("quantity não preenchido");
    }
    if(typeof quantity !== "number") {
        res.status(400)
        throw new Error("quantity deve ser um number");
    }
    
    if(typeof totalPrice === undefined) {
        res.status(400)
        throw new Error("totalPrice não preenchido");
    }
    if(typeof totalPrice !== "number") {
        res.status(400)
        throw new Error("totalPrice deve ser um number");
    }

    const newPurchase = {
        userId, 
        productId,
        quantity,
        totalPrice
    }

    if (!users.find((user)=>{user.id === userId})) {
        res.status(404)
        throw new Error("Id do user não encontrado no banco de dados, verifique se o id está cadastrado corretamente");
    }

    if (!products.find((product)=>{product.id === productId})) {
        res.status(404)
        throw new Error("Id do produto não encontrado no banco de dados, verifique se o id está cadastrado corretamente");
    }

    let soma
    products.find((product) =>{
        if(product.id === newPurchase.productId){
          return product.price
        }
        soma = product.price + newPurchase.quantity
    })

    if (soma !== newPurchase.totalPrice) {
        res.status(400)
        throw new Error("Valor final incorreto");
        
    }

    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
    
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message)
    }
    
} )

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/product/:id", (req: Request, res: Response) =>{
    
    try {
        const id = req.params.id as string
        
        if(id[0] !== "p"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'p'");
            
        }
    
        const result = products.filter((product)=>{
            return product.id.includes(id)
        })

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
    res.send(error.message)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.get("/users/:id/purchases", (req: Request, res: Response) =>{
    try {
        const id = req.params.id as string
        if(id[0] !== "a"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'a'");
            
        }

        const result = purchases.filter((purchase)=>{
            return purchase.userId.includes(id)
        })

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
    res.send(error.message)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.delete("/users/:id", (req: Request, res: Response)=>{
    try {
        const id = req.params.id as string
        
        if(id[0] !== "a"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'a'");
            
        }

        const userIndex = users.findIndex((user) => user.id === id)

        if (typeof userIndex === undefined) {
            res.status(404)
            throw new Error("User não encontrado");
        }
        
        if (userIndex >= 0) {
            users.splice(userIndex, 1)
        }
            
        res.status(200).send("User apagado com sucesso")
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.delete("/products/:id", (req: Request, res: Response)=>{
    try {
        const id = req.params.id as string

        if(id[0] !== "p"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'p'");
            
        }
        
        const productIndex = products.findIndex((product) => product.id === id)
        
        if (typeof productIndex === undefined) {
            res.status(404)
            throw new Error("Produto não encontrado");
        }

            if (productIndex >= 0) {
            products.splice(productIndex, 1)
            }
    
        res.status(200).send("Produto apagado com sucesso")
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.put("/users/:id", (req: Request, res: Response)=>{

    try {
        const id = req.params.id as string
        const newEmail = req.body.email as string
        const newpassword = req.body.password as string 

        if(id[0] !== "a"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'a'");
            
        }

        const user = users.find((user) => user.id === id) 
        
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
            user.email = newEmail || user.email as string
            user.password = newpassword || user.password as string
        }
    
        res.status(200).send("Cadastro atualizado com sucesso")
        
    } catch (error) {
        console.log(error);
        if(res.statusCode === 200){
            res.status(500)
        }
    res.send(error.message)
    }
})

//----------------------------------------------------------------------------------------------------------------------------------

app.put("/products/:id", (req: Request, res: Response)=>{
    
    try {
        const id = req.params.id
        const newName = req.params.name as string 
        const newPrice = req.body.price as number 
        const newCategory = req.body.category as string 
    
        if(id[0] !== "p"){
            res.status(400)
            throw new Error("Id inválido, deve iniciar com a letra 'p'");
            
        }
        const product = products.find((product) => product.id === id) 
    
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
            product.name = newName || product.name as string
            product.price = newPrice || product.price as number
            product.category = newCategory || product.category as string
        }
    
        res.status(200).send("Produto atualizado com sucesso")
        
    } catch (error) {
        console.log(error);
    if(res.statusCode === 200){
        res.status(500)
    }
        res.send(error.message)
    }
})