class Cuadrado extends Figura {
    constructor() {
        super();
    }

    dibujar() {
        let xA = this.posicion.x - this.radio;
        let yA = this.posicion.y - this.radio;
        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.lineTo(xA + this.radio * 2, yA + this.radio * 2);
        ctx.stroke();
    

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.stroke();
    }

}