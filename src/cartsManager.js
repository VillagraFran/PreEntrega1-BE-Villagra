import fs from "fs";

class CartsManager {
    static id = 0;

    constructor() {
        this.path = "./src/carts.json";
    }

    async getCartById(cid) {
        const readCarts = await fs.promises.readFile(this.path, "utf-8")
        const carts = JSON.parse(readCarts)
        const findCarts = carts.find((cr) => cr.id === cid )

        if (findCarts) {
            return(findCarts)
        } else {
            return({error:"cart not found"})
        }
    }

    createCart(cid, pid) {
        try {
            const exist = fs.existsSync(this.path)
            let arrCarts = []
            let status = {}

            if (exist) {
                const readCarts = fs.readFileSync(this.path, "utf-8")
                arrCarts = JSON.parse(readCarts)
            }
            
            const product = { product: pid, quantity: 1 }
                
            const existCart = arrCarts.findIndex((cr) => cr.id === cid)
            
            if (existCart !== -1) {
                const existProduct = arrCarts[existCart].products.findIndex((pr) => pr.product === pid)
                
                if (existProduct !== -1) {
                    arrCarts[existCart].products[existProduct].quantity++;
                } else {
                    arrCarts[existCart].products.push(product)
                }

                status = { message: "producto agregado" }
            
            } else {
                arrCarts.push({ id: cid, products: [product] })
                status = { message: "carrito creado" }
            }
                
            fs.writeFileSync(this.path, JSON.stringify(arrCarts))
            CartsManager.id++;
            return status;

        } catch (error) {
            throw error;
        }
    }
}

export default CartsManager;