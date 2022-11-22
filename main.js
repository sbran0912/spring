import * as lb2d from './lib2d.js';
import * as phys from './lib2d-phys.js';

class Spring {
  /**
   * @param {number} k stiffnes of spring
   * @param {number} d damping of spring
   * @param {phys.Ball} a 
   * @param {phys.Ball} b 
   */
  constructor(k, d, a, b) {
    this.k = k;
    this.d = d;
    this.a = a;
    this.b = b;
    /**@type {number} */
    this.restLength = lb2d.subVector(this.b.location, this.a.location).mag();
  }

  update() {
    //SpringForce 
    let connect = lb2d.subVector(this.b.location, this.a.location);
    let expand = connect.mag() - this.restLength;
    connect.normalize();
    let fs = lb2d.multVector(connect, -this.k * expand);

    //DampingForce
    let vel_total = lb2d.subVector(this.b.velocity, this.a.velocity);
    let vel_connect_mag = connect.dot(vel_total);
    let fd = lb2d.multVector(connect, vel_connect_mag * -this.d);

    //applyForce
    let ft = lb2d.addVector(fd, fs);
    this.a.applyForce(lb2d.multVector(ft, -1), 0);
    this.b.applyForce(ft, 0);
  }

  display() {
    lb2d.line(this.a.location.x, this.a.location.y, this.b.location.x, this.b.location.y);
  }
}

/**
 * @param {Spring[]} s 
 */
function updateSprings(s) {
  s.forEach(el => {
    el.update();
    el.display();
  })
}

/**
 * @param {phys.Ball[]} p 
 */
function updateParticles(p) {
  p.forEach(el => {
    el.update();
    el.display();
  })
}

/**
 * @param {phys.Wall[]} w 
 */
function showWalls(w) {
  w.forEach(el => {
    el.display();
  })
}


// Öffentliche Variablen definieren
let /**@type {phys.Wall[]} */ walls = [];
let /**@type {phys.Ball[]} */ particles = [];
let /**@type {Spring[]} */ springs = [];
let kick = phys.createKicking();
let MAX = 4;

function start() {
  /* for (let i = 0; i < MAX; i++) {
    particles.push(new phys.Ball(200, 50 + i * 60, 10));
  } */

  particles.push(new phys.Ball(50, 50, 3));
  particles.push(new phys.Ball(150, 50, 3));
  particles.push(new phys.Ball(50, 100, 3));
  particles.push(new phys.Ball(150, 100, 3));
  springs.push(new Spring(0.1, 0.5, particles[0], particles[1]))
  springs.push(new Spring(0.1, 0.5, particles[1], particles[3]))
  springs.push(new Spring(0.1, 0.5, particles[0], particles[2]))
  springs.push(new Spring(0.1, 0.5, particles[2], particles[3]))
  springs.push(new Spring(0.1, 0.5, particles[0], particles[3]))
  springs.push(new Spring(0.1, 0.5, particles[1], particles[2]))



  /* for (let i = 0; i < MAX - 1; i++) {
    springs.push(new Spring(1, 0.5, particles[i], particles[i + 1]));
  } */

  walls.push(new phys.Wall(5, 470, 780, 30));
  walls.push(new phys.Wall(760, 5, 30, 470));

  /* particles.forEach(el => {
    el.inertia = Infinity;
  }) */

  //particles[0].mass = Infinity;
  //particles[MAX-1].mass = Infinity;
  //particles[MAX - 1].applyForce(new lb2d.Vector(0, 50), 0);
  //particles[MAX - 2].applyForce(new lb2d.Vector(0, 30), 0);

  lb2d.init(800, 500);
  lb2d.startAnimation(draw);
}

function draw() {
  lb2d.background();
  showWalls(walls);
  kick(particles);
  phys.checkCollision(particles);
  phys.checkWalls(particles, walls);
  updateParticles(particles);
  updateSprings(springs);
  //console.log(particles[MAX-1].velocity);
}

// Programmstart
start();
