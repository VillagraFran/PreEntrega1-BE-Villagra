import ProductRepository from "../repository/products.repository.js";

const productRepository = new ProductRepository();

class productManager {
    async createProduct(title, description, price, thumbnail, code, stock, category) {
        try {
            const newProduct = await productRepository.createProductRepository(title, description, price, thumbnail, code, stock, category)
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProducts(limit, page, query, sort) {
        try {
            const products = await productRepository.getProductsRepository(limit, page, query, sort)
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductsById(pid) {
        try {
            const product = await productRepository.getProductsByIdRepository(pid);
            if (product.owner !== owner) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(pid) {
        try {
            const deleteProduct = await productRepository.deleteProductRepository(pid)
            return deleteProduct;
            
        } catch (error) {
            throw error;
        }
    }
}

export default productManager;