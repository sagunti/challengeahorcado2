//Seleccionamos los elementos para js
let pantalla = document.querySelector("canvas");
let nuevoJuego = document.getElementById("boton-nuevo-juego").style.display = "none"
let SalirInvisible = document.getElementById("boton-salir").style.display = "none"
let AgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let NuevoJuego = document.getElementById("boton-nuevo-juego");
let salir = document.getElementById("boton-salir");
let cancelar = document.getElementById("boton-cancelar");


var palabras = ['ESTUFA', 'CABALLO', 'PERRO', 'TIGRE', 'PELOTA', 'GORRO', 'TIBURON', 'RAYO','VERANO', 'PLAYA'];
var tablero = document.getElementById('horca').getContext('2d');
var palabraSecreta = "";
var letras = [];
var palabraAcertada = "";
var fallos = 8;
let letrasIncorrectas = [];
let numeroFallos = 8
let letraElegida = [];

//llamadas a funciones con el click en botones 

document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
}

document.getElementById("boton-guardar").onclick = () => {
  guardarPalabra();
}

NuevoJuego.addEventListener("click", function () {
  location.reload();
});

salir.addEventListener("click", function () {
  location.reload();
});

cancelar.addEventListener("click", function () {
  location.reload();
});


// me da aleatoriamente una palabra para descifrar
function elegirPalabra() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)]
  palabraSecreta = palabra
  return palabra
}



// Letra pulsada en el teclado por el usuario
function letraPulsada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false
    
  }
  else {
    letras.push(key)
    return true
  }
}
//Agregar letra correcta en mayuscula a la palabra secreta
function agregarLetraCorrecta(i) {
  palabraAcertada += palabraSecreta[i].toUpperCase()
}
//Agregar letra incorrecta en mayuscula y actualizar contador
function agregarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    fallos -= 1
  }
}


function finJuego(letra) {
  //comprueba si la letra ha sido incluída en el array de las letras correctas o incorrectas
 if(letraElegida.length < palabraSecreta.length) { 
    //incluye las letra en la lista letrasIncorrectas
    letrasIncorrectas.push(letra);
    

    //Comprueba si cometio los 8 errores permitidos
    if (letrasIncorrectas.length > numeroFallos) {
      perdiste()
    }

    //agrega la letra, muestra la letra y dibuja el error 
    else if(letraElegida.length < palabraSecreta.length) {
      agregarLetraIncorrecta(letra)
      escribirLetraIncorrecta(letra, fallos)
    }
  }
 } 

//Verifica si el usuario ha ganado
function Ganado(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {

    ganaste()
    
  }

}



//comprueba que sea una letra 
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

function irAgregarPalabra() {
  document.getElementById("invisible").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}


function guardarPalabra() {
  
  let nuevaPalabra = document.getElementById('input-nueva-palabra').value;

  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    alert("Palabra agregada exitosamente")
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  }

  else{
    alert("Por favor la palabra debe tener almenos una letra")
  }

}

//inicia el juego
function iniciarJuego() {

  
  document.getElementById("invisible").style.display = 'none';

  //llama  a la función que dibuja el tablero del ahorcado
  dibujarTablero();

  //llama a la función que sortea la palabra  
  elegirPalabra();

  //llama a la función que dibuja las líneas de la cantidad de letras
  dibujarLineas();
  document.getElementById("boton-nuevo-juego").style.display = "block"
  document.getElementById("boton-salir").style.display = "block"

  // captura la letra escrita en teclado
  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()
    if (letrasIncorrectas.length <= numeroFallos) {
      if (!letraPulsada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          agregarLetraCorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escribirLetraCorrecta(i)
              Ganado(letra)

            }
          }

        }
        // si el usuario cometió más fallos de los que son permitidos, 
        //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
        else {
          if (!letraPulsada(e.key) && !Ganado(letra)) return
          dibujarAhorcado(fallos)
          finJuego(letra)
        }
      }
    }

    //si sigue tocando letras se reinicia la pantalla
    else {
      location.reload();
      
    }

  };
}

