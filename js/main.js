let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos (productos);
    }

    )

const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll("#producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const card = document.createElement("div");
        card.classList.add("producto");
        card.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.titulo}</h3>
        <p class="producto-precio">${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>`;

        contenedorProductos.append(card);
    })
    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "destacados") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Productos Destacados"
            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar() {

    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);

    });
}

let productosEnCarrito;


let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

// const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS) ;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}



// const productosEnCarrito = []

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
} 

Swal.fire({
    title: "Precios de Pelicula",
    text: "del 1 al 31 de agosto",
    imageUrl: "./img/hotsale.png", 
    imageHeight: 100,
    imageAlt: "A tall image"
  });