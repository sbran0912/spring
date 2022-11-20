import * as lb2d from './lib2d.js';
import * as phys from './lib2d-phys.js';

class Particle extends phys.Box{
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} w 
   * @param {number} h 
   */
  constructor(x,y,w,h) {
    super (x,y,w,h)
    this.lifespan = 0;
  }

  display() {
    lb2d.strokeColor(0)
    super.display();
  }
}

/* Start des Programms */
/** @type {Particle[]} */
const el = [];
el.push(new Particle(10,10,50,50));
el.push(new Particle(100,100,50,50))

lb2d.init(800,600);
el[0].display();
el[1].display();



