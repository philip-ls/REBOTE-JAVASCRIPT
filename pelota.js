// Descripción de la clase Pelota
// Esta clase representa una sola pelota en la simulación.
class Pelota {
  // El constructor se llama cuando creamos una nueva instancia de Pelota.
  constructor() {
    // Define el radio de la pelota, generando un número aleatorio entre 10 y 25.
    this.radio = this.generarNumero(10, 25); // Ajustado el rango de radio
    // Define la posición inicial de la pelota en el canvas.
    // Se asegura de que la pelota aparezca completamente dentro de los límites del canvas.
    this.posicion = {
      x: this.generarNumero(this.radio, ctx.canvas.width - this.radio),
      y: this.generarNumero(this.radio, ctx.canvas.height - this.radio),
    };
    // Define la velocidad inicial de la pelota en los ejes X e Y.
    // Genera números aleatorios para la velocidad inicial.
    this.velocidad = {
      x: this.generarNumero(-3, 3), // Ajustado el rango de velocidad
      y: this.generarNumero(-3, 3), // Ajustado el rango de velocidad
    };
    // Asigna un color aleatorio a la pelota.
    this.colorFondo = this.getRandomColor();
    // Define la masa de la pelota, simplificada como proporcional a su radio.
    // Esto se usa en los cálculos de colisión entre pelotas.
    this.masa = this.radio; // Masa proporcional al radio (simplificación)
  }

  // Métodos ---------------------------------------------
  // Este método detecta si la pelota colisiona con los bordes del canvas.
  detectarColisionBordes() { // Renombrado para mayor claridad
    // Colisión en el eje X (bordes izquierdo y derecho)
    if (this.posicion.x <= this.radio) {
        // Si colisiona con el borde izquierdo, invierte la velocidad en X.
        this.velocidad.x *= -1;
        // Ajusta la posición para que la pelota no se quede "pegada" en el borde.
        this.posicion.x = this.radio;
    } else if (this.posicion.x >= ctx.canvas.width - this.radio) {
        // Si colisiona con el borde derecho, invierte la velocidad en X.
        this.velocidad.x *= -1;
        // Ajusta la posición para que la pelota no se quede "pegada" en el borde.
        this.posicion.x = ctx.canvas.width - this.radio;
    }

    // Colisión en el eje Y (bordes superior e inferior)
    if (this.posicion.y <= this.radio) {
        // Si colisiona con el borde superior, invierte la velocidad en Y.
        this.velocidad.y *= -1;
        // Ajusta la posición para que la pelota no se quede "pegada" en el borde.
        this.posicion.y = this.radio;
    } else if (this.posicion.y >= ctx.canvas.height - this.radio) {
        // Si colisiona con el borde inferior, invierte la velocidad en Y.
        this.velocidad.y *= -1;
        // Ajusta la posición para que la pelota no se quede "pegada" en el borde.
        this.posicion.y = ctx.canvas.height - this.radio;
        // Opcional: Reducir velocidad en rebote vertical para simular pérdida de energía.
        // Esto hace que la pelota no rebote tan alto cada vez.
        this.velocidad.y *= 0.8; // Factor de rebote (0.8 significa 80% de la velocidad se mantiene)
    }
  }

  // Este método detecta y resuelve colisiones con otra pelota.
  checkCollisionWithOtherBall(otherBall) {
    // Calcular la distancia entre los centros de las dos pelotas.
    const dx = otherBall.posicion.x - this.posicion.x;
    const dy = otherBall.posicion.y - this.posicion.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Si la distancia es menor o igual a la suma de los radios, hay colisión.
    if (distance <= this.radio + otherBall.radio) {
      // Calcular el vector normal de la colisión (dirección de la colisión).
      const normalX = dx / distance;
      const normalY = dy / distance;

      // Calcular el vector de velocidad relativa (diferencia de velocidades).
      const relativeVelocityX = otherBall.velocidad.x - this.velocidad.x;
      const relativeVelocityY = otherBall.velocidad.y - this.velocidad.y;

      // Calcular el producto punto de la velocidad relativa y el vector normal.
      // Esto nos dice qué tan rápido se acercan las pelotas en la dirección de la colisión.
      const dotProduct = relativeVelocityX * normalX + relativeVelocityY * normalY;

      // Si las pelotas se están moviendo una hacia la otra (producto punto negativo),
      // procedemos a calcular el rebote.
      if (dotProduct < 0) {
        // Calcular el impulso de la colisión (asumiendo colisión elástica y masas).
        // Esta fórmula deriva de la conservación del momento y la energía cinética.
        const impulse = (2 * dotProduct) / (this.masa + otherBall.masa);

        // Aplicar el impulso a las velocidades de ambas pelotas para simular el rebote.
        // La velocidad de cada pelota cambia en la dirección normal, proporcional al impulso
        // y a la masa de la otra pelota.
        this.velocidad.x += impulse * normalX * otherBall.masa;
        this.velocidad.y += impulse * normalY * otherBall.masa;
        otherBall.velocidad.x -= impulse * normalX * this.masa;
        otherBall.velocidad.y -= impulse * normalY * this.masa;

        // Opcional: Separar ligeramente las pelotas para evitar que se queden pegadas
        // si la colisión las dejó superpuestas.
        const overlap = (this.radio + otherBall.radio) - distance;
        const separation = overlap / 2; // Mover cada pelota la mitad del solapamiento

        this.posicion.x -= separation * normalX;
        this.posicion.y -= separation * normalY;
        otherBall.posicion.x += separation * normalX;
        otherBall.posicion.y += separation * normalY;
      }
    }
  }

  // Este método dibuja la pelota en su posición actual en el canvas.
  dibujar() {
    // Inicia un nuevo camino de dibujo.
    ctx.beginPath();
    // Dibuja un arco (círculo) en la posición y con el radio de la pelota.
    ctx.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2);
    // Establece el color de relleno para la pelota.
    ctx.fillStyle = this.colorFondo;
    // Rellena el círculo con el color especificado.
    ctx.fill();

    // ctx.lineWidth = 2; // Esta línea no es necesaria a menos que quieras un borde
  }

  // Métodos auxiliares ----------------------------------
  // Genera un número entero aleatorio dentro de un rango dado (incluyendo min y max).
  generarNumero(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
  }

  // Genera un color hexadecimal aleatorio.
  getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0") // Asegura que el código hexadecimal tenga 6 dígitos
    );
  }

}

// Eliminada la función animar global, ahora está en controler.js
// function animar() { ... }
