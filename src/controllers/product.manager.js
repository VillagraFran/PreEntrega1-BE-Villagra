import ProductRepository from "../repository/product.repository.js";

const productRepository = new ProductRepository();

export const createProduct = async(req, res) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        let thumbnail;

        if (req.file === undefined) {
            thumbnail="defaultImg.jpg"
        } else {
            thumbnail=req.file.originalname
        }
        const owner = req.user.email;
    
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            return res.status(400).json({ error: "complete todos los campos" });
        };
        
        const product = await productRepository.create(title, description, price, thumbnail, code, stock, category, owner);
        res.redirect('/');

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
            return res.send({message: "no tienes permiso para eliminar este producto"});
        };
        

    } catch (error) {
        throw error;
    };
};
