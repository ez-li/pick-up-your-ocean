// PGraphics mask;

let bubble_count = 0;
const Y_AXIS = 1;
let system;
let school;
let time;

function setup() {
  createCanvas(1280, 960);

  // create gradient background

  // create bubble system
  system = new BubbleSystem();
  // school = new FishSchool(fish_green);

  // set frame rate
  frameRate(30);
  background_sound.loop();
  
  // fish array
  let fish = [fish_green, fish_pink, fish_orange];

  // make trash
  let trashes = [trash1, trash2, trash3, trash4, trash5];
  for (let i = 0; i < numTrash; i++) {
    let randTrash = trashes[Math.floor(Math.random()*trashes.length)]
    trashArray[i] = new Trash(
      random(width),
      random(height),
      random(30, 70),
      i,
      trashArray,
      randTrash
    );
  }
  noStroke();
  fill(255, 204);

  // make trash can
  trashDrop()
  
  // for (let i = 0; i < fish.length-1; i++) {
  //   Fish.run(fish[i]);
  // }
  

}

function preload() {
  
  // load images
  fish_green = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ffish_green.png?v=1601151665244");
  fish_pink = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ffish_pink.png?v=1601151665244");
  fish_orange = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ffish_orange.png?v=1601151665298");
  fish_blue = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ffish_blue.png?v=1601151665383");
  fish_red = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ffish_red.png?v=1601151665281");
  blowfish = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fblowfish.png?v=1601154161302");
  eel = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Feel.png?v=1601154842551");
  jellyfish = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fjellyfish.png?v=1601156889068");
  
  seaweed_1 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fseaweed.png?v=1601154058246");
  seaweed_2 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fseaweed_2.png?v=1601154101343");
  seaweed_3 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fseaweed_4.png?v=1601154143060");
  seaweed_4 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fseaweed_3.png?v=1601154144358");
  
  trash1 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fdead_fish.png?v=1601154070087");
  trash2 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Fdead_fish_5.png?v=1601154832131");
  trash3 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ftrash3.png?v=1601154723368");
  trash4 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ftrash4.png?v=1601154723449");
  trash5 = loadImage("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2Ftrash5.png?v=1601154723369");
  
  // load sounds
  background_sound = loadSound("https://cdn.glitch.com/74a5bfba-6d7e-4199-b147-85c2e82f91a3%2FOptional_Tiramisu_Song.mp3?v=1601159892478");
}

function draw() {
  
  // for (let i = 0; i < fish.lentgh - 1; i++){
  //   Fish(fish[i]); 
  // }

  time = millis();
  c1 = color(0, 140 + 60 * sin(time * 0.0001), 190 + 40 * sin(time * 0.0001));
  c2 = color(0, 20 + 30 * sin(time * 0.0001), 60 + 40 * sin(time * 0.0001));

  setGradient(0, 0, width, height, c1, c2, Y_AXIS);

  // bottom terrains

  push();
  noStroke();
  fill(30, 15, 40, 200);
  translate(0, height - 200);
  beginShape();
  vertex(0, 200);
  for (i = 0; i < 2 * PI; i += 0.05) {
    var x = map(i, 0, 2 * PI, 0, width + 10);
    var y = 50 * noise(x * 0.0053);
    vertex(x, y);
  }
  vertex(width, 200);
  vertex(0, 200);
  endShape();
  pop();

  push();
  noStroke();
  fill(30, 35, 60, 80);
  translate(0, height - 70);
  beginShape();
  vertex(0, 200);
  for (i = 0; i < 2 * PI; i += 0.05) {
    var x = map(i, 0, 2 * PI, 0, width + 10);
    var y = 30 * noise(x * 0.031);
    vertex(x, y);
  }
  vertex(width, 100);
  vertex(0, 100);
  endShape();
  pop();


  // create bubbles method 2 with OOP
  if (bubble_count % 10 == 0) {
    system.addBubble();
    
  }
  system.run();

  bubble_count++;
  
  // create fish
  
  // for (let i = 0; i < fish.length-1; i++) {
  //   Fish.run(fish[i]);
  // }

  fish(width / 2, height / 2, 100);
  push();
  translate(100*sin(time*0.0001),0);
  image(fish_green, 200, 200);
  image(fish_pink, 600, 700);
  image(fish_orange, 250, 700);
  pop();
  
  push();
  translate(100*noise(time*0.0001),0);
  image(fish_blue, 150, 600);
  image(fish_red, 1000, 100);


  image(blowfish, 900, 500);
  image(eel, 800, 300);
  pop();
  
  push();
  translate(150*sin(time*0.0005),350*noise(time*0.0005));
  jellyfish.resize(130, 150);
  image(jellyfish, 900, 100);
  pop();
  
  
  // create seaweed
  
  image(seaweed_1, 50, 700);
  image(seaweed_2, 1250, 750);
  image(seaweed_3, 400, 800);
  image(seaweed_4, 900, 700);

  // make trash
  trashArray.forEach(trash => {
    trash.collide();
    trash.move();
    trash.display();
    trash.mousePressed();
    trash.mouseDragged();
    trash.mouseReleased();
  });
  
}


let Bubble = function(position) {
  this.acceleration = createVector(0, -0.05);
  this.velocity = createVector(random(-1, 1), random(-0.5, 0));
  this.position = createVector(random(width), height);
  this.lifespan = 200;
  this.size = random(5, 40);
  this.opacity = random(100, 200);
}

Bubble.prototype.run = function() {
  this.update();
  this.display();
}


// update position
Bubble.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1;
}


// display bubble
Bubble.prototype.display = function() {
  noStroke();
  fill(200, this.opacity - this.lifespan);
  ellipse(this.position.x, this.position.y, this.size);
};

Bubble.prototype.isDead = function() {
  return this.lifespan < -10;
}

// create an array of bubbles
let BubbleSystem = function() {
  this.bubbles = [];
}

BubbleSystem.prototype.addBubble = function() {
  this.bubbles.push(new Bubble());

}

BubbleSystem.prototype.run = function() {
  for (let i = this.bubbles.length - 1; i >= 0; i--) {
    let b = this.bubbles[i];
    b.run();

    if (b.isDead()) {
      this.bubbles.shift();
    }
  }
};



let Fish = function(img) {
  this.position = createVector(random(width), height);
  this.img = img;
}

Fish.prototype.run = function() {
  this.update();
  this.display();
}

Fish.prototype.update = function() {

}

Fish.prototype.display = function() {
  imageMode(CENTER);
  image(this.img, this.position.x, this.position.y);
};


// let FishSchool = function(img) {
//   this.origin = img.copy();
//   this.school = [];
// }

// FishSchool.prototype.addFish = function() {
//   this.school.push(new Fish(this.origin));

// }

// FishSchool.prototype.run = function() {
//   for (let i = this.school.length - 1; i >= 0; i--) {
//     let f = this.school[i];
//     if (this.school.length < 5) {
//       f.run();
//     }
//   }
// };


// show message by clicking on fish
// function mouseClicked() {
  
// }

// create a fish

function fish(x, y, r) {

  // body

  fill(230, 130, 70);
  ellipse(x, y, r + 20, r - 20);

  // cheek

  fill(200, 50, 100);
  ellipse(x + r / 6, y, r / 6);

  // eye

  fill(255, 255, 255);
  ellipse(x + (r + 20) / 4, y - (r - 20) / 6, r / 4);
  fill(0);
  ellipse(x + (r + 30) / 4, y - (r - 20) / 6, r / 8);

  // mouth
  
  noFill();
  stroke(0);
  strokeWeight(5);
  arc(x + r/2, y - r/8, r/2, r/2, HALF_PI, PI-QUARTER_PI);

  // tail
  noStroke();
  fill(200, 50, 100);
  arc(x - r/2, y, r, r, HALF_PI + QUARTER_PI + 0.05*sin(time*0.03), PI+QUARTER_PI+ 0.05*cos(time*0.03));

}



function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}



// drag and drop for trash
function trashDrop() {
  // createCanvas(1000, 1000);
  var trashBin;
  trashBin = createDiv('🗑️');
  trashBin.style('font-size', '48px');
  trashBin.dragOver(trashHover);
  trashBin.dragLeave(trashUnhover);
  trashBin.drop(throwInTrash, trashUnhover);
}

function throwInTrash(trash) {
  trash.remove()
}

function trashHover() {
  trashBin.style('background-color','#ccc');
}

function trashUnhover() {
  trashBin.style('background-color','none');
}

// make floating trash
let numTrash = 13;
let spring = 0.05;
let gravity = 0.03;
let friction = -0.9;
let trashArray = [];

class Trash {
  constructor(xin, yin, din, idin, oin, variant) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.img = variant;
    this.startx;
    this.starty;
    this.dragging = false;
  }

  collide() {
    for (let i = this.id + 1; i < numTrash; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    if (!this.dragging) {
      this.vy += gravity;
      this.x += this.vx;
      this.y += this.vy;
      if (this.x + this.diameter / 2 > width) {
        this.x = width - this.diameter / 2;
        this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= friction;
      }
      if (this.y + this.diameter / 2 > height) {
        this.y = height - this.diameter / 2;
        this.vy *= friction;
      } else if (this.y - this.diameter / 2 < 0) {
        this.y = this.diameter / 2;
        this.vy *= friction;
      }
    }
  }

  display() {
    image(this.img, this.x, this.y)
  }
  
  mousePressed() {
    if (dist(this.x, this.y, mouseX, mouseY) < 50/2) {
      console.log('dragging trash')
      this.dragging = true;
    }
     this.startx = mouseX;
  }

 mouseDragged() {
    // var diff = this.startX - mouseX;
    // this.x = this.x - diff;
    // this.startX = mouseX;
    if (this.dragging){
      this.x = mouseX;
      this.y = mouseY;
      // this.moving()
    }
  }
  
  mouseReleased(){
    if (dist(this.x, this.y, mouseX, mouseY) > 50/2) {
      this.dragging = false;
    }

  }
  
}


//  function mousePressed(trash) {
//      trash.startx = mouseX;
//   }

//  function mouseDragged(trash) {
//     var diff = trash.startX - mouseX;
//     trash.x = trash.x - diff;
//     trash.startX = mouseX;
//   }