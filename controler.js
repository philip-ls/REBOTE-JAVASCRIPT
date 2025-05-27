/*

Controlador principal de la simulación de la pelota

*/

let canvas = null;
let ctx = null;
let pelotas = []; // Cambiado a un array para múltiples pelotas
let gravedad = 0.3; // Ajustada la gravedad para un comportamiento más suave con múltiples pelotas
const NUM_PELOTAS = 29; // Número de pelotas a crear

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  document.body.style.padding = "20px";
  ctx.canvas.width = window.innerWidth - 100;
  ctx.canvas.height = window.innerHeight - 100;

  cargarInicio();
};

function cargarInicio() {
  // Crear múltiples pelotas
  for (let i = 0; i < NUM_PELOTAS; i++) {
    pelotas.push(new Pelota());
  }
  animar(); // Iniciar el bucle de animación
}

// Función de animación global (movida desde pelota.js)
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

  // Dibujar los bordes del canvas permanentemente
  ctx.strokeStyle = 'black'; // Color para los bordes (puedes cambiarlo)
  ctx.lineWidth = 2; // Grosor de la línea de los bordes (puedes cambiarlo)
  ctx.strokeRect(0, 0, canvas.width, canvas.height); // Dibuja el rectángulo de los bordes

  // Aplicar gravedad, actualizar posición y detectar colisiones con bordes para cada pelota
  for (let i = 0; i < pelotas.length; i++) {
    let pelota = pelotas[i];
    pelota.velocidad.y += gravedad; // Aplicar gravedad
    pelota.posicion.x += pelota.velocidad.x;
    pelota.posicion.y += pelota.velocidad.y;
    pelota.detectarColisionBordes(); // Detectar colisión con bordes
  }

  // Detectar y resolver colisiones entre pelotas
  for (let i = 0; i < pelotas.length; i++) {
    for (let j = i + 1; j < pelotas.length; j++) {
      pelotas[i].checkCollisionWithOtherBall(pelotas[j]);
    }
  }

  // Dibujar cada pelota en su nueva posición
  for (let i = 0; i < pelotas.length; i++) {
    pelotas[i].dibujar();
  }

  // Solicitar el siguiente frame de animación
  requestAnimationFrame(animar);
}
