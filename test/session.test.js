import supertest from "supertest";
import chai, {expect} from "chai";

const requester = supertest("http://localhost:8080")

describe("test de sesiones", ()=> {
    it("debe loguear al usuario", async()=>{
        const user = {
            email:"ejemplo@gmail.com",
            password: "123"
        }

        const {statusCode, ok, _body} = await requester.post('/api/login');
        console.log(statusCode, ok, _body)
    })
})