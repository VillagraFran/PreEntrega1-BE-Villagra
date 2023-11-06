import { productModel } from "../dao/db/models/product.model.js";

class productService {
    async createProductService(title, description, price, thumbnail, code, stock, category) {
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

    async getProductsService(limit, page, query, sort) {

        const products = await productModel.paginate(query, { 
            page: page,
            limit: limit, 
            sort: sort,
            lean: true
        })

        const pageProducts = {
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

        return pageProducts;
    }

    async deleteProductService(pid) {
        const products = await productModel.deleteOne({_id:pid})
        return products;
    }
}

export default productService;