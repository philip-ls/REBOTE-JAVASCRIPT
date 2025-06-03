// Descripción de la clase Figuras

class Figuras {
  constructor() {
    this.radio = this.generarNumero(10, 25); // Ajustado el rango de radio
    this.posicion = {
      x: this.generarNumero(this.radio, ctx.canvas.width - this.radio),
      y: this.generarNumero(this.radio, ctx.canvas.height - this.radio),
    };
    this.velocidad = {
      x: this.generarNumero(-3, 3), // Ajustado el rango de velocidad
      y: this.generarNumero(-3, 3), // Ajustado el rango de velocidad
    };
    this.colorFondo = this.getRandomColor();
    this.masa = this.radio; // Masa proporcional al radio (simplificación)
  }

  // Métodos ---------------------------------------------

  detectarColisionBordes() {
    // Colisión en el eje X
    if (this.posicion.x <= this.radio) {
        this.velocidad.x *= -1;
        this.posicion.x = this.radio; // Ajustar posición para evitar que se quede pegada
    } else if (this.posicion.x >= ctx.canvas.width - this.radio) {
        this.velocidad.x *= -1;
        this.posicion.x = ctx.canvas.width - this.radio; // Ajustar posición para evitar que se quede pegada
    }

    // Colisión en el eje Y
    if (this.posicion.y <= this.radio) {
        this.velocidad.y *= -1;
        this.posicion.y = this.radio; // Ajustar posición para evitar que se quede pegada
    } else if (this.posicion.y >= ctx.canvas.height - this.radio) {
        this.velocidad.y *= -1;
        this.posicion.y = ctx.canvas.height - this.radio; // Ajustar posición para evitar que se quede pegada
    }
  }

  checkCollisionWithOtherBall(otherBall) {
    // Calcular la distancia entre los centros de las figurass
    const dx = otherBall.posicion.x - this.posicion.x;
    const dy = otherBall.posicion.y - this.posicion.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Si la distancia es menor o igual a la suma de los radios, hay colisión
    if (distance <= this.radio + otherBall.radio) {
      // Calcular el vector normal de la colisión
      const normalX = dx / distance;
      const normalY = dy / distance;

      // Calcular el vector de velocidad relativa
      const relativeVelocityX = otherBall.velocidad.x - this.velocidad.x;
      const relativeVelocityY = otherBall.velocidad.y - this.velocidad.y;

      // Calcular el producto punto de la velocidad relativa y el vector normal
      const dotProduct = relativeVelocityX * normalX + relativeVelocityY * normalY;

      // Si las figurass se están moviendo una hacia la otra (producto punto negativo)
      if (dotProduct < 0) {
        // Calcular el impulso (asumiendo colisión elástica y masas)
        // Usamos una masa simplificada (proporcional al radio)
        const impulse = (2 * dotProduct) / (this.masa + otherBall.masa);

        // Aplicar el impulso a las velocidades
        this.velocidad.x += impulse * normalX * otherBall.masa;
        this.velocidad.y += impulse * normalY * otherBall.masa;
        otherBall.velocidad.x -= impulse * normalX * this.masa;
        otherBall.velocidad.y -= impulse * normalY * this.masa;

        // Opcional: Separar ligeramente las figurass para evitar que se queden pegadas
        const overlap = (this.radio + otherBall.radio) - distance;
        const separation = overlap / 2;

        this.posicion.x -= separation * normalX;
        this.posicion.y -= separation * normalY;
        otherBall.posicion.x += separation * normalX;
        otherBall.posicion.y += separation * normalY;
      }
    }
  }
  


  dibujar() {
    ctx.beginPath();
    ctx.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = this.colorFondo;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }

  // Métodos auxiliares ----------------------------------
  generarNumero(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
  }

  getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")
    );
  }

}
