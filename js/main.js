// Productos
const productos = [

    // Abrigos ------------------------------------

    {
        id: 'abrigo-01',
        titulo: 'Abrigo 01',
        imagen: './img/abrigos/01.jpg',
        categoria: {
            nombre:'Abrigos',
            id:'abrigos'
        },
        precio: 1000,
    },
    {
        id: 'abrigo-02',
        titulo: 'Abrigo 02',
        imagen: './img/abrigos/02.jpg',
        categoria: {
            nombre:'Abrigos',
            id:'abrigos'
        },
        precio: 1000,
    },
    {
        id: 'abrigo-03',
        titulo: 'Abrigo 03',
        imagen: './img/abrigos/03.jpg',
        categoria: {
            nombre:'Abrigos',
            id:'abrigos'
        },
        precio: 1000,
    },
    {
        id: 'abrigo-04',
        titulo: 'Abrigo 04',
        imagen: './img/abrigos/04.jpg',
        categoria: {
            nombre:'Abrigos',
            id:'abrigos'
        },
        precio: 1000,
    },
    {
        id: 'abrigo-05',
        titulo: 'Abrigo 05',
        imagen: './img/abrigos/05.jpg',
        categoria: {
            nombre:'Abrigos',
            id:'abrigos'
        },
        precio: 1000,
    },

    // Camisetas ------------------------------------
    {
        id: 'camiseta-01',
        titulo: 'camiseta 01',
        imagen: './img/camisetas/01.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    {
        id: 'camiseta-02',
        titulo: 'camiseta 02',
        imagen: './img/camisetas/02.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    {
        id: 'camiseta-03',
        titulo: 'camiseta 03',
        imagen: './img/camisetas/03.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    {
        id: 'camiseta-04',
        titulo: 'camiseta 04',
        imagen: './img/camisetas/04.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    {
        id: 'camiseta-05',
        titulo: 'camiseta 05',
        imagen: './img/camisetas/05.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    {
        id: 'camiseta-06',
        titulo: 'camiseta 06',
        imagen: './img/camisetas/06.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    {
        id: 'camiseta-07',
        titulo: 'camiseta 07',
        imagen: './img/camisetas/07.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    {
        id: 'camiseta-08',
        titulo: 'camiseta 08',
        imagen: './img/camisetas/08.jpg',
        categoria: {
            nombre:'Camisetas',
            id:'camisetas'
        },
        precio: 1000,
    },
    // Pantalones ------------------------------------
    {
        id: 'pantalon-01' ,
        titulo: 'pantalon 01',
        imagen: './img/pantalones/01.jpg',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalones',
        }
    },
    {
        id: 'pantalon-02' ,
        titulo: 'pantalon 02',
        imagen: './img/pantalones/02.jpg',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalones',
        }
    },
    {
        id: 'pantalon-03' ,
        titulo: 'pantalon 03',
        imagen: './img/pantalones/03.jpg',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalones',
        }
    },
    {
        id: 'pantalon-04' ,
        titulo: 'pantalon 04',
        imagen: './img/pantalones/04.jpg',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalones',
        }
    },
    {
        id: 'pantalon-05' ,
        titulo: 'pantalon 05',
        imagen: './img/pantalones/05.jpg',
        categoria: {
            nombre: 'Pantalones',
            id: 'pantalones',
        }
    },
];

const  contenedorProductos = document.querySelector('#contenedor-productos');
const  btnCategorias = document.querySelectorAll('.btn-categoria');
const  tituloPrincipal = document.querySelector('#titulo-principal');
let  btnAgregar = document.querySelectorAll('.producto-agregar');
let  numerito = document.querySelector('#numero');


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