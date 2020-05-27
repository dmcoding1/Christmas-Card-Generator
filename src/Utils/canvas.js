export const init = canvas => {
  if (!canvas) return;
  
  const c = canvas.getContext('2d');

  let { innerWidth } = window;

  let documentHeight = document.querySelector("#root").clientHeight;

  canvas.width = innerWidth;
  canvas.height = documentHeight;

  canvas.style.width = innerWidth + "px"; 
  canvas.style.height = documentHeight + "px";
 

  let WIDTH = innerWidth;
  let HEIGHT = documentHeight;


  const colors = ['#91E2ED', '#91C1ED', '#77E8DA', '#91C7ED'];

  const handleResize = (canvas) => {
    const c = canvas.getContext('2d');
    c.clearRect(0, 0, canvas.width, canvas.height);
  
    init(canvas);
  }

  window.addEventListener('resize', (e) => {
    handleResize(canvas);  
  })

  class Snowflake {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y; 
      this.radius = radius;
      this.color = color;
    }

    dy = 0.5;

    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }

    update() {
      if(this.radius > 3) {
        this.dy = 0.8;
      }
      
      if (this.y > HEIGHT) {
        this.x = randomNumber(this.radius, WIDTH - this.radius);
        this.y = randomNumber(-HEIGHT, 0);
      }

      this.y += this.dy;
      this.draw();
    }
  }

  let snowflakes = [];
  function init() {
    snowflakes = [];
    const maxSnowflakeSize = 4;

    for (let i = 0; i < 100; i++) {
      const randomRadius = randomNumber(1, maxSnowflakeSize);
      const x = randomNumber(randomRadius, WIDTH - randomRadius);
      const y = randomNumber(0.1 * HEIGHT, -HEIGHT);
      snowflakes.push(new Snowflake(x, y, randomRadius, randomColor()));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let snowflake of snowflakes) {
      snowflake.update();
    }
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomColor() {
    return colors[randomNumber(0,4)];
  }

  init();
  animate();
}

