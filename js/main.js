// PRODUCTOS

const productos = [
    {
        id: "destacados-01",
        titulo: "destacados 01",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Destacados",
            id: "destacados"
        },
        precio: "1000"
    },
    {
        id: "destacados-02",
        titulo: "destacados 02",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Destacados",
            id: "destacados"
        },
        precio: "1000"
    },
    {
        id: "destacados-03",
        titulo: "destacados 03",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Destacados",
            id: "destacados"
        },
        precio: "1000"
    },
    {
        id: "destacados-04",
        titulo: "destacados 04",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Destacados",
            id: "destacados"
        },
        precio: "1000"
    },
    {
        id: "destacados-05",
        titulo: "destacados 05",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Destacados",
            id: "destacados"
        },
        precio: "1000"
    },
    {
        id: "ropa-01",
        titulo: "ropa 01",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Ropa",
            id: "ropa"
        },
        precio: "1000"
    },
    {
        id: "ropa-02",
        titulo: "ropa 02",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Ropa",
            id: "ropa"
        },
        precio: "1000"
    },
    {
        id: "ropa-03",
        titulo: "ropa 03",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Ropa",
            id: "ropa"
        },
        precio: "1000"
    },
    {
        id: "ropa-04",
        titulo: "ropa 04",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Ropa",
            id: "ropa"
        },
        precio: "1000"
    },
    {
        id: "ropa-05",
        titulo: "ropa 05",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "ropa",
            id: "ropa"
        },
        precio: "1000"
    },
    {
        id: "accesorios-01",
        titulo: "Accesorios 01",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: "1000"
    },
    {
        id: "accesorios-02",
        titulo: "Accesorios 02",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: "1000"
    },
    {
        id: "accesorios-03",
        titulo: "Accesorios 03",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: "1000"
    },
    {
        id: "accesorios-04",
        titulo: "Accesorios",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: "1000"
    },
    {
        id: "accesorios-05",
        titulo: "Accesorios 05",
        imagen: "./img/pelota-voley-wilson.png",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: "1000"
    },
];

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