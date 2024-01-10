import { ticketModel } from "../DAO/mongo/models/ticket.model.js";

class ticketRepository{
    async get() {
        const tickets = await ticketModel.find();
        return tickets;
    };

    async getById(tid) {
        const ticket = await ticketModel.findById({_id: tid});
        return ticket;
    }

    async create(date, amount, purchaser) {
        const ticket = await ticketModel.create({
            purchase_datetime: date.day +"/"+ date.month +"/"+ date.year,
            amount: amount,
            purchaser: purchaser.email
        });

        return ticket;
    }
};

export default ticketRepository;