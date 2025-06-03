class Cuadrado extends Figuras {
    constructor() {
        super();
    }
    dibujar() {
    let xA = this.posicion.x - this.radio;
    let yA = this.posicion.y - this.radio;
    ctx.beginPath();
    ctx.rect(xA, yA, this.radio * 2, this.radio * 2);
    ctx.fillStyle = this.colorFondo;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    }
}