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
            id: ProductManager.id,
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
            
            const prodExist = arrProd.find((pr) => pr.code === product.code)
            if (prodExist) {
                console.log(`
                ---------------------
                product already exist
                ---------------------
                `)
            } else {
                fs.writeFileSync(this.path, JSON.stringify([...arrProd, product]))
                ProductManager.id ++;  
            }
        } else {
            fs.writeFileSync(this.path, JSON.stringify([product]))
            ProductManager.id ++;  
        }

    }


    deleteProduct(code) {
        const products = this.getProducts()

        const filtred = products.filter((pr) => {
            if (pr.code !== code) {
                return pr;
            }
        })

        fs.writeFileSync(this.path, JSON.stringify(filtred))
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
    
        fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
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