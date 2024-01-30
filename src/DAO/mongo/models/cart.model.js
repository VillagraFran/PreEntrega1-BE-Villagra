import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: String,
                    ref: 'products'
                },
                quantity: Number,
            }
        ]
    }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export { cartModel };