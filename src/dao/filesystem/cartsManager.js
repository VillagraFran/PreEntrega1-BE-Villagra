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

    async createCart(cid) {
        const readCarts = await fs.promises.readFile(this.path, "utf-8")
        const carts = JSON.parse(readCarts)

        const existCart = carts.findIndex((cr) => cr.id === cid)

        if (existCart !== -1) {
            return({error: "Ya existe un carrito con ese Id"})
        } else {
            const cart = {id: cid, products:[]}
            carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))

            return({messege: "carrito creado"})
        }
    }

    async addProductCart(cid, pid) {
        const readCarts = await fs.promises.readFile(this.path, "utf-8")
        const carts = JSON.parse(readCarts)

        const product = {product: pid, quantity: 1}
        const existCart = carts.findIndex((cr) => cr.id === cid)

        if (existCart !== -1) {
            const existProd = carts[existCart].products.findIndex((pr) => pr.product === pid)

            if (existProd !== -1) {
                carts[existCart].products[existProd].quantity++;
            } else {
                carts[existCart].products.push(product)
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
            return({messege: "producto agregado al carrito"})
        } else {
            return({error: "el carrito seleccionado no existe"})
        }
    }
}

export default CartsManager;