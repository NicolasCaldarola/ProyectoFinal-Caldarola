let H2 = document.getElementById("Titulo");
H2.innerText = "Sorteo";

let miFormulario = document.getElementById("Formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();
  console.log("Formulario Enviado");

  let input1 = document.getElementById("nombre");
  let nombre = input1.value;

  if (/^[A-Za-z]+$/.test(nombre)) {
    // Nombre válido, se envía el formulario
    agregarDatos(e);
  } else {
    // Nombre inválido, se muestra el alert
    Swal.fire({
      icon: "error",
      title: "Cuidado!",
      text: "No se permite ingresar NINGUN caracter especial",
      position: 'center-start',
    });
  } 
}


let input1 = document.getElementById("nombre");
let input2 = document.getElementById("email");

input1.onchange = () => {
  console.log("valor1");
};
input2.onchange = () => {
  console.log("valor2");
};

// ARRAY CON LOS DATOS INGRESADOS Y GUARDADOS
let datos = [];

function agregarDatos(evento) {
  evento.preventDefault();
  let Formulario = evento.target.children;

  let infoDatos = {
    nombre: Formulario[2].value,
    email: Formulario[7].value,
  };

  let nuevosDatos = document.createElement("li");
  nuevosDatos.innerText = `
                                nombre: ${infoDatos.nombre},
                                Email: ${infoDatos.email},                               
    `;

  document.querySelector("#datos").append(nuevosDatos);

  datos.push(infoDatos);

  document.getElementById("reset").click();
}

let btnGuardar = document.getElementById("guardar");

btnGuardar.onclick = () => {
  localStorage.setItem("listaDatos", JSON.stringify(datos));
}

//BOTON SORTEO GANADOR
function realizarSorteo() {
  if (datos.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Cuidado!",
      text: "Deben Registrarse al menos 3 nombres para el sorteo -.-",
      position: 'center-start',
    });
  } else {

    var ganador = datos[Math.floor(Math.random() * datos.length)];

    Swal.fire({
      icon: "success",
      title: "F E L I C I T A C I O N E S !",
      text: 'El Ganador del Sorteo es: ' + ganador.nombre,
      position: 'center-start'
    });
  }
}






