import { productModel } from "../dao/db/models/product.model.js";

class productRepository {
    async createProductRepository(title, description, price, thumbnail, code, stock, category) {
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

    async getProductsRepository(limit, page, query, sort) {

        const products = await productModel.paginate(query, { 
            page: page,
            limit: limit, 
            sort: sort,
            lean: true
        })

        const pageDTO = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `http://localhost:8080/products/?page=${products.prevPage}` : '',
            nextLink: products.hasNextPage ? `http://localhost:8080/products/?page=${products.nextPage}` : ''
        }

        return pageDTO;
    }

    async getProductsByIdRepository (pid) {
        const product = await productModel.findById(pid);
        return product;
    }

    async deleteProductRepository(pid) {
        const products = await productModel.deleteOne({code: pid})
        return products;
    }
}

export default productRepository;