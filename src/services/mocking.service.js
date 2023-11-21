import {fakerES as faker} from "@faker-js/faker"

const fakeProduct = () => (
    {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: "img",
        code: 0,
        stock: faker.number.int({max: 100}),
        category: faker.commerce.department()
    }
)

const generateFakeProductsArray = (count) => {
    const fakeProductsArray = [];
    for (let i = 0; i < count; i++) {
      fakeProductsArray.push(fakeProduct());
    }
    return fakeProductsArray;
};
  
const fakeProductsArray = generateFakeProductsArray(100);

export default fakeProductsArray;