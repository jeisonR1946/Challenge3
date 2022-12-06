//Selectores

let botonNuevoJuego = document.getElementById("iniciar-juego2").style.display = "none";
let btnSalirDesaparecer = document.getElementById("salir-juego").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT","HTML", "CSS"];
let tablero = document.getElementById("forca").getContext("2d");
let palabraSecreta = "";

var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];
//PalabraSecreta

function escojerPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra;
    console.log(palabraSecreta);
    return palabra;
}

function comprobarLetra(key){
    let estado = false
    if (key >= 65 && letras.indexOf(key) || key <= 90 && letras.indexOf(key)) {
      letras.push(key)  
      console.log(key)
      return estado;
    } else {
      estado = true
      console.log(key)
      return true;
    }
}

function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false
    
  }
  else {
    letras.push(key)
    return true
  }
}

function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {

    ganaste()
    
  }

}

function verificarFinJuego(letra) {
  //checa si la letra ha sido incluída en el array de  las letras correctas o incorrectas
 if(letraElegida.length < palabraSecreta.length) { 
    //incluye las letras ya digitadas en el arrau
    letrasIncorrectas.push(letra);
    

    //valida se el usuário cometió el numero maximo de errores
    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste()
    }
    else if(letraElegida.length < palabraSecreta.length) {
      adicionarLetraIncorrecta(letra)
      escribirLetraIncorrecta(letra, errores)
    }
  }
 } 

 
function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1
  }
}


function anadirLetraIncorrecta() {
      errores -= 1
}

function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}
  
function cargarJuego(){
  let refresh = document.getElementById('salir-juego');
  refresh.addEventListener('click', _ => {
              location.reload();
  })
}

function ingresarPalabra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}

//Iniciar juego

function guardarPalabra (){
  document.getElementById("guardar-palabra").style.display = "none";
  document.getElementById("salir-juego-agregar").style.display = "none";

    //captura lo que el usuario ha digitado
  let nuevaPalabra = document.getElementById('input-nueva-palavra').value;

  // incluye la palabra que el usuario digitó en el array de las palabras a seren sorteadas
  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    
    swal("Juego del ahorcado","La palabra fue guardada","success");
    
  
    // haz con que los componentes de la pantalla de agregar palabra desaparezcan
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  }
  else{
    swal("Juego del ahorcado","Ninguna palabra ha sido digitada","success");
  }

  console.log(palabras)
  iniciarJuego();
}



function iniciarJuego(){
    document.getElementById("iniciar-juego").style.display = "none";
    document.getElementById("ingresar-palabra").style.display = "none";
    dibujarCanvas();
    escojerPalabraSecreta();    
    dibujarLineas();
    document.getElementById("iniciar-juego2").style.display = "block"
    document.getElementById("salir-juego").style.display = "block"

    document.onkeydown = (e) => {
      // pone la letra en letra mayuscula
      let letra = e.key.toUpperCase()
      //verifica si el usuario todavia no ha perdido
      if (letrasIncorrectas.length <= numeroDeErrores) {
        if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
          if (palabraSecreta.includes(letra)) {
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
            for (let i = 0; i < palabraSecreta.length; i++) {
              if (palabraSecreta[i] === letra) {
                escrribirLetraCorrecta(i)
                verificarVencedor(letra)
  
              }
            }
  
          }
          // si el usuario cometió más errores de los que son permitidos, 
          //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
          else {
            if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
            dibujarAhorcado(errores)
            verificarFinJuego(letra)
          }
        }
      }
      else {
        
        swal("Juego del ahorcado","has realizado el límite de letras incorrectas","success");
      }
  
    };

}
