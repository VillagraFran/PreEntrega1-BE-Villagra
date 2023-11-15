import mongoose, { Mongoose } from "mongoose";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: mongoose.Schema.Types.ObjectId,
    purchase_datetime: String,
    amount: Number,
    purchaser: String
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export { ticketModel };