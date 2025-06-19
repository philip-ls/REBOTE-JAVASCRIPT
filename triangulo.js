class Triangulo extends Figuras {
    constructor() {
        super();
    }
    dibujar() {
        let xA = this.posicion.x;
        let yA = this.posicion.y - this.radio;
        let xB = this.posicion.x - this.radio;
        let yB = this.posicion.y + this.radio;
        let xC = this.posicion.x + this.radio;
        let yC = this.posicion.y + this.radio;

        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.lineTo(xB, yB);
        ctx.lineTo(xC, yC);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }
}