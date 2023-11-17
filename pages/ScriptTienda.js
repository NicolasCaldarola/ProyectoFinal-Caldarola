const tienda = document.getElementById('tienda');
let botonesAgregar = document.querySelectorAll('.remera-agregar');
const numerito = document.getElementById('numerito');

function cargarRemeras(remeras) {
    remeras.forEach(remera => {
        const nuevaRemera = document.createElement('div');
        nuevaRemera.classList = "item"
        nuevaRemera.innerHTML = `
            <div class="tienda-imagen">
                <img class="remera1" src="../images/${remera.img}" alt="${remera.nombre}">
            </div>
            <div class="remera-detalles">
                <h3 class="remera-titulo">${remera.nombre}</h3>
                <p class="remera-precio">$${remera.precio}</p>
                <button class="remera-agregar" id="${remera.id}">Agregar</button>
            </div>
        `;
        tienda.appendChild(nuevaRemera);
    });

    actualizarBotonesAgregar();
}

cargarRemeras(remeras)

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.remera-agregar');

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let remerasEnCarrito;

const productosEnCarritoLS = localStorage.getItem('remeras-en-carrito');

if (productosEnCarritoLS) {
    remerasEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    remerasEnCarrito = [];
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Remera agregada",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #3e7c7c, burlywood)",
        borderRadius: '2rem',
        textTransform: 'uppercase',
        fontSize: '.75rem'
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function(){} // Callback luego del click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const remeraAgregada = remeras.find(remera => remera.id === idBoton)
    console.log(remeraAgregada);

    if (remerasEnCarrito.some(remera => remera.id === idBoton)) {
        const index = remerasEnCarrito.findIndex(remera => remera.id === idBoton)
        remerasEnCarrito[index].cantidad++;
    } else{
        remeraAgregada.cantidad = 1;
        remerasEnCarrito.push(remeraAgregada);
    }

    actualizarNumerito();

    localStorage.setItem("remeras-en-carrito", JSON.stringify(remerasEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = remerasEnCarrito.reduce((acc, remera) => acc + remera.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}