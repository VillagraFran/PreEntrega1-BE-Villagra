import ProductRepository from "../repository/product.repository.js";

const productRepository = new ProductRepository();

export const createProduct = async(req, res) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const thumbnail = req.file.originalname|| `img.jpg`;
        const owner = req.user.mail;
    
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            return res.status(400).json({ error: "complete todos los campos" });
        };
        
        const product = await productRepository.create(title, description, price, thumbnail, code, stock, category, owner);
        res.status(200).send(product);

    } catch (error) {
        throw error;
    };
};

export const getProducts = async(req, res) => {
    try {
        const {limit, page, query, sort} = req.query;

        const sortOptions = {
            asd: {price: 1},
            desc: {price: -1}
        };

        const limitModel = limit ? parseInt(limit, 10) : 10;
        const pageModel = page ? parseInt(page, 10) : 1;
        const queryModel = query ?? {};
        const sortModel = sortOptions[sort] ?? undefined;

        const products = await productRepository.get(
            limitModel, 
            pageModel, 
            queryModel, 
            sortModel
        );
        
        res.json(products);

    } catch (error) {
        throw error;
    };
};

export const getProductById = async(req, res) => {
    try {
        const {pid} = req.params;
        const product = await productRepository.getById(pid);
        res.status(200).send(product);

    } catch (error) {
        throw error;
    };
    
};

export const deleteProduct = async(req, res) => {
    try {
        const {pid} = req.params;
        const owner = req.user;
        const getProduct = await productRepository.getById(pid);

        if (getProduct.owner === owner.email || owner.rol === "admin") {
            const product = await productRepository.delete(pid);
            return res.status(200).send(product);
        } else {
            return Error;
        };
        

    } catch (error) {
        throw error;
    };
};
