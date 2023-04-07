let productos = []

fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })
const  contenedorProductos = document.querySelector('#contenedor-productos');
const  btnCategorias = document.querySelectorAll('.btn-categoria');
const  tituloPrincipal = document.querySelector('#titulo-principal');
let  btnAgregar = document.querySelectorAll('.producto-agregar');
let  numerito = document.querySelector('#numero');

btnCategorias.forEach(boton => boton.addEventListener('click' , () => {
    aside.classList.remove('aside-visible');
}));

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>  {

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <div class="producto">
            <img class="producto-img" clas src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="produto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio"> $${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>  
        `
        contenedorProductos.append(div);
    })
    actualizarBtnAgregar()
}

cargarProductos(productos);

btnCategorias.forEach(boton =>{
    boton.addEventListener('click', (e) =>{
        btnCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if(e.currentTarget.id != 'todos'){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBtn = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBtn);
        } else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(productos);
        }

    })

})

function actualizarBtnAgregar() {
    btnAgregar = document.querySelectorAll('.producto-agregar');

    btnAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    })
}

let productosEnCarrito = [];

// Obteniendo los objetos almacenados en localStorage
let productosEnCarritoLS = localStorage.getItem('productos-en-carrito');
if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumero ();
} else {
    productosEnCarrito = [];
    
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9",
          borderRadius: "2rem",
          textTransform: "upperCase",
          fontSize: ".75rem",
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[index].cantidad++;
        
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);

    }
    actualizarNumero ();

    // Guardando los productos en carrito en localstrorage
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
}

function actualizarNumero (){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
