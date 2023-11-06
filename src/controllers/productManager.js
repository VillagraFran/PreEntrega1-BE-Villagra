import ProductService from "../services/products.service.js";

const productService = new ProductService();

class productManager {
    async createProduct(title, description, price, thumbnail, code, stock, category) {
        try {
            const newProduct = await productService.createProductService(title, description, price, thumbnail, code, stock, category)
            return newProduct;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async getProducts(limit, page, query, sort) {
        try {
            const products = await productService.getProductsService(limit, page, query, sort)
            return products;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }

    async deleteProduct(pid) {
        try {
            const deleteProduct = await productService.deleteProductService(pid)
            return deleteProduct;
        } catch (error) {
            console.log("service-error:", error)
            throw error;
        }
    }
}

export default productManager;