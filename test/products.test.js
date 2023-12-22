import supertest from "supertest";
import chai, {expect} from "chai";
import { config } from "dotenv";
config()

const requester = supertest("http://localhost:8080")


describe("test de productos", () => {
    
    it("debe crear un producto con POST en /api/products", async() => {
        const product = {
            title:"productito",
            description:"se puede usar",
            price:1000,
            thumbnail:"img",
            code: 98,
            stock:10,
            category:"producto",
            owner:"yo"
        }
        const {statusCode, ok, _body} = await requester.post('/api/products').send(product);

        expect(_body).to.have.property("_id");
    })

    it("debe eliminar el producto con su codigo con delete en /api/products/:pid", async() => {
        const {statusCode, ok, _body} = await requester.delete('/api/products/98')
        expect(statusCode).to.be.equal(200)
    })

    it("debe traer los productos paginados con GET en /api/products", async() => {
        const {statusCode, ok, _body} = await requester.get('/api/products')
        expect(_body.payload).to.not.be.empty;
    })
})