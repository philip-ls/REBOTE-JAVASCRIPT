/*
 
Controlador principal de la simulación de la figuras
 
*/

let canvas = null;
let ctx = null;
let figurass = [];
const NUM_FIGURASS = 10; // Número de figurass a crear

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  document.body.style.padding = "20px";
  ctx.canvas.width = window.innerWidth - 100;
  ctx.canvas.height = window.innerHeight - 100;

  cargarInicio();
};

function cargarInicio() {
  // Crear múltiples figurass (mezcla de círculos, cuadrados y triángulos)
  for (let i = 0; i < NUM_FIGURASS; i++) {
    const randomShape = Math.random();
    if (randomShape < 0.33) { // 33% de posibilidad de crear un círculo  
      figurass.push(new Figuras());
    } else if (randomShape < 0.66) {
      figurass.push(new Cuadrado());
    } else {
      figurass.push(new Triangulo());
    }
  }
  animar(); // Iniciar el bucle de animación
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

  // Dibujar los bordes del canvas permanentemente
  ctx.strokeStyle = 'black'; // Color para los bordes (puedes cambiarlo)
  ctx.lineWidth = 2; // Grosor de la línea de los bordes (puedes cambiarlo)
  ctx.strokeRect(0, 0, canvas.width, canvas.height); // Dibuja el rectángulo de los bordes

  // Aplicar gravedad, actualizar posición y detectar colisiones con bordes para cada figuras
  for (let i = 0; i < figurass.length; i++) {
    let figuras = figurass[i];
    //figuras.velocidad.y += gravedad; // Añadir gravedad
    figuras.posicion.x += figuras.velocidad.x;
    figuras.posicion.y += figuras.velocidad.y;
    figuras.detectarColisionBordes(); // Detectar colisión con bordes
  }

  // Detectar y resolver colisiones entre figurass
  for (let i = 0; i < figurass.length; i++) {
    for (let j = i + 1; j < figurass.length; j++) {
      figurass[i].checkCollisionWithOtherBall(figurass[j]);
    }
  }

  // Dibujar cada figuras en su nueva posición
  for (let i = 0; i < figurass.length; i++) {
    figurass[i].dibujar();
  }

  // Solicitar el siguiente frame de animación
  requestAnimationFrame(animar);
}