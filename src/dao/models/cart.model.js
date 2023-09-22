import mongoose from 'mongoose';

const messageCollection = 'message';

const messageSchema = new mongoose.Schema({
    products: [
        {
            product:Number,
            quantity:Number
        },
    ]
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export { messageModel };