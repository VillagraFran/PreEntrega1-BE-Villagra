import supertest from "supertest";
import chai, {expect} from "chai";

const requester = supertest("http://localhost:8080")

describe("test de carts", ()=> {
    let cartId = "";

    it("debe crear un carrito con POST en /api/carts", async()=>{
        const {statusCode, _body} = await requester.post('/api/carts');
        cartId = _body.id
        expect(statusCode).to.be.equal(200);
        expect(_body.id).to.be.ok;
    })

    it("debe sumar un producto al carrito con POST en /api/carts/:cid/product/:pid", async()=>{
        const {statusCode, _body} = await requester.post(`/api/carts/${cartId}/product/650cd3c4718efd4f3838811a`);

        expect(statusCode).to.be.equal(200);
        expect(_body.products).to.not.be.empty;
    })

    it("debe vaciar al carrito con PUT en /api/carts/:cid", async()=>{
        const {_body} = await requester.put(`/api/carts/${cartId}`);

        expect(_body).to.be.deep.equal([])
    })

    it("debe eliminar el carrito con DELETE en /api/carts/:cid", async()=>{
        const {statusCode} = await requester.delete(`/api/carts/${cartId}`);

        expect(statusCode).to.be.equal(200);
    })


})