var DAMPING = 0.97;

function GetRandomColor() {
  var r = 0,
    g = 0,
    b = 0;
  while (r < 100 && g < 100 && b < 100) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  }
  return "rgb(" + r + "," + g + "," + b + ")";
}

function Particle(x, y) {
  this.x = this.oldX = x;
  this.y = this.oldY = y;
}

Particle.prototype.integrate = function () {
  var velocityX = (this.x - this.oldX) * DAMPING + 4 * Math.random() - 2;
  var velocityY = (this.y - this.oldY) * DAMPING + 4 * Math.random() - 2;
  this.Color = GetRandomColor();
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += velocityX;
  this.y += velocityY;
};

Particle.prototype.attract = function (x, y) {
  var dx = x - this.x;
  var dy = y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  this.x += dx / distance;
  this.y += dy / distance;
};

Particle.prototype.draw = function () {
  ctx.strokeStyle = this.Color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(this.oldX, this.oldY);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
};

var display = document.getElementById("display");
var ctx = display.getContext("2d");
var particles = [];
var width = (display.width = window.innerWidth);
var height = (display.height = window.innerHeight);
var mouse = { x: width * 0.5, y: height * 0.5 };

for (var i = 0; i < 300; i++) {
  particles[i] = new Particle(Math.random() * width, Math.random() * height);
}

display.addEventListener("mousemove", onMousemove);
function onMousemove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

particles.Colour = GetRandomColor();

requestAnimationFrame(frame);
function frame() {
  requestAnimationFrame(frame);
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].attract(mouse.x, mouse.y);
    particles[i].integrate();
    particles[i].draw();
  }
}
