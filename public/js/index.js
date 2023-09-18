const socket = io();

const productContainer = document.getElementById("product-container")

socket.on('new-product', (data) => {

    const newProduct = document.createElement("div")
    newProduct.innerHTML = `
        <h5>${data.title}</h5>
        <p>${data.price}</p>
    `

    productContainer.appendChild(newProduct)
})

socket.on('delete-product', (data) => {

    const deleteProduct = data.map((pr) => {
        return `
        <div>
            <h5>${pr.title}</h5>
            <p>${pr.price}</p>
        </div>
        `
    })

    productContainer.innerHTML = deleteProduct.join('')
})
