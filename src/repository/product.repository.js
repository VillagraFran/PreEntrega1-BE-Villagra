import { productModel } from "../DAO/mongo/models/product.model.js";
import { pageDTO } from "../dto/pageDTO.js";

class productRepository {
    async create(title, description, price, thumbnail, code, stock, category, owner) {
        const product = await productModel.create({
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock, 
            category,
            owner
        });
        return product;
    };

    async get(limit, page, query, sort) {
        const products = await productModel.paginate(query, {
            page: page,
            limit: limit, 
            sort: sort,
            lean: true
        });

        const paginate = pageDTO(products);

        return paginate;
    };

    async getById(pid) {
        const product = await productModel.findById(pid).lean();
        return product;
    };

    async update() {

    };

    async delete(pid) {
        const product = await productModel.deleteOne({_id: pid});
        return product;
    };
};

export default productRepository;