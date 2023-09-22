const socket = io();

const productContainer = document.getElementById("product-container")

socket.on('new-product', (data) => {

    const newProduct = document.createElement("div")
    newProduct.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="http://localhost:8080/static/${data.thumnail}" class="card-img-top" style="height: 200px;">
            <div class="card-body">
                <h2>${data.title}</h2>
                <p class="card-text">${data.description}</p>
                <p>${data.price}</p>
            </div>
        </div>
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

let user = ""

const message = document.getElementById("message")
const content = document.getElementById("content")

Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    confirmButtonText: 'Ingresar',
  }).then((result) => {
    user = result.value;
  });

message.addEventListener("change", (e) => {
    socket.emit('message', {
        user: user,
        message: e.target.value,
      });
})

socket.on('new-message', (data) => {
    const messages = data.map(({user, message}) => {
      return `<div class="card">${user}:: ${message}</div>`;
    });
  
    content.innerHTML = messages.join('');
});