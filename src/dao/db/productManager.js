import { productModel } from "../models/product.model.js";

class productManager {
    async createProduct(title, description, price, thumbnail, code, stock, category) {
        const product = await productModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            status: true,
            stock,
            category,
        });

        return product;
    }

    async getProducts() {
        const products = await productModel.find().lean()
        return products;
    }

    async deleteProduct(pid) {
        const products = await productModel.deleteOne({_id:pid})
        return products;
    }
}

export default productManager;