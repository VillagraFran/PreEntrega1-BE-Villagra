import fs from "fs"

class ProductManager{
    static id = 0
    
    constructor() {
        this.path = "./src/products.json";
    }
    
    getProducts() {
        const readProducts = fs.readFileSync(this.path, 'utf-8')
        const arrProd = JSON.parse(readProducts)
        return(arrProd)
    }

    addProduct(title, description, price, thumbnail, code, stock, category) {

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            status: true,
            stock,
            category,
        }

        const exist = fs.existsSync(this.path)
        
        if (exist) {
            const arrProd = this.getProducts()
            const id = arrProd.reduce((finalId, pr) => (pr.id > finalId ? pr.id : finalId), 0)
            product.id = id + 1;
            
            const prodExist = arrProd.find((pr) => pr.code === product.code)
            if (prodExist) {
                return({ error: "El producto ya existe" })
            } else {
                arrProd.push(product)
                fs.writeFileSync(this.path, JSON.stringify(arrProd, null, "\t"))
            }
        } else {
            const arrProd = this.getProducts()
            const id = arrProd.reduce((finalId, pr) => (pr.id > finalId ? pr.id : finalId), 0)
            product.id = id + 1;
            fs.writeFileSync(this.path, JSON.stringify([product]))
        }

        return(product)
    }


    deleteProduct(code) {
        const products = this.getProducts()

        const filtred = products.filter((pr) => {
            if (pr.code !== code) {
                return pr;
            }
        })

        fs.writeFileSync(this.path, JSON.stringify(filtred, null, "\t"))
        return(filtred)
    }

    updateProduct(pid, fieldToUpdate, valueUpdated) {
        const products = this.getProducts()
    
        const updatedProducts = products.map((pr) => {
            if (pr.id === pid) {
                return { ...pr, [fieldToUpdate]: valueUpdated };
            } else {
                return pr;
            }
        });
    
        fs.writeFileSync(this.path, JSON.stringify(updatedProducts, null, "\t"));
    }

    getProductById(pid) {
        const products = this.getProducts()
        const findProduct = products.find((pr) => pr.id === pid)

        if (findProduct) {
            return(findProduct)
        } else {
            return({error: "producto no encontrado"})
        }
    }
}

export default ProductManager;