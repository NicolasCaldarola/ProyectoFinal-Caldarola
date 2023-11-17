const productosEnCarrito = JSON.parse(localStorage.getItem('remeras-en-carrito'));

const contenedorCarritoVacio = document.getElementById('carrito-vacio');

const contenedorCarritoRemeras = document.getElementById('carrito-remeras');

const contenedorCarritoAcciones = document.getElementById('carrito-acciones');

const contenedorCarritoComprado = document.getElementById('carrito-comprado');

let botonesEliminar = document.querySelectorAll('.carrito-remera-eliminar');

const botonVaciar = document.getElementById('carrito-acciones-vaciar');

const contenedorTotal = document.getElementById('total');

const botonComprar = document.getElementById('carrito-acciones-comprar');

function cargarRemerasCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0){
        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoRemeras.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
        contenedorCarritoRemeras.innerHTML = '';
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-remera');
            div.innerHTML = `
                <img class="carrito-remera-imagen" src="${producto.img}" alt="${producto.nombre}">
                <div class="carrito-remera-titulo">
                    <small>Nombre</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-remera-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-remera-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-remera-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-remera-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoRemeras.appendChild(div);
        });
        
    } else{
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoRemeras.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    }

    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarRemerasCarrito()

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.carrito-remera-eliminar');

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Remera eliminada",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #3e7c7c, burlywood)",
        borderRadius: '2rem',
        textTransform: 'uppercase',
        fontSize: '.75rem'
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(remera => remera.id === idBoton)

    productosEnCarrito.splice(index, 1);
    cargarRemerasCarrito()

    localStorage.setItem('remeras-en-carrito', JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: '<b>¿Estas Seguro?</b>',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, remera) => acc + remera.cantidad, 0)} remera/s!`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Si',
        cancelButtonText:'No',
        background: '#3e7c7c',
        color: 'white'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem('remeras-en-carrito', JSON.stringify(productosEnCarrito));
            cargarRemerasCarrito()
        }
    })
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, remera) => acc + (remera.precio * remera.cantidad), 0);
    total.innerText = `$${totalCalculado}`
}

botonComprar.addEventListener('click', comprarCarrito);
function comprarCarrito() {
    Swal.fire({
        title: '<b>¿Estas Seguro?</b>',
        icon: 'question',
        html: `Se van a comprar ${productosEnCarrito.reduce((acc, remera) => acc + remera.cantidad, 0)} remera/s!`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Si',
        cancelButtonText:'No',
        background: '#198754',
        color: 'white'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem('remeras-en-carrito', JSON.stringify(productosEnCarrito));
            contenedorCarritoVacio.classList.remove('disabled');
            contenedorCarritoRemeras.classList.add('disabled');
            contenedorCarritoAcciones.classList.add('disabled');
            contenedorCarritoComprado.classList.add('disabled');
            Swal.fire({
                icon: 'success',
                title: 'Muchas gracias por su compra',
            })
        }
    })
}