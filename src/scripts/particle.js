export default class Particle {
    constructor(flare) {
        this.flare = flare;

        this.radius = 300;

        this.init();
    }

    init() {
        this.x = Math.random() * this.flare.x || 0;
        this.y = Math.random() * this.flare.y || 0;

        this.startLife = Math.ceil(Math.random() * 100);
        this.currentLife = this.startLife;

        this.color = { rgb: [], a: 1 };

        for (let i = 0; i < 3; ++i) {
            this.color.rgb.push(Math.floor(Math.random() * 255));
        }

        this.color.rgb = this.color.rgb.join(", ");

        this.speed = {
            x: Math.random(),
            y: Math.random()
        };
    }

    update() {
        const ratio = this.currentLife / this.startLife;

        this.color.a = 1 - ratio;

        this.currentLife -= 1;

        if (this.currentLife === 0) {
            this.init();
        }
    }

    move() {
        if (this.x <= 0 || this.x > this.flare.x) {
            this.speed.x = -this.speed.x;
        }

        if (this.y <= 0 || this.y > this.flare.y) {
            this.speed.y = -this.speed.y;
        }

        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    render() {
        this.move();
        this.draw();
    }

    draw() {
        this.flare.ctx.beginPath();
        this.flare.ctx.fillStyle = this.gradient();
        this.flare.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        this.flare.ctx.fill();
        this.flare.ctx.closePath();
    }

    gradient() {
        const g = this.flare.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        g.addColorStop(0, "rgba(" + this.color.rgb + "," + this.color.a * 0.2 + ")");
        g.addColorStop(0.5, "rgba(" + this.color.rgb + "," + this.color.a * 0.1 + ")");
        g.addColorStop(1, "rgba(" + this.color.rgb + "," + this.color.a * 0 + ")");

        return g;
    }
}

