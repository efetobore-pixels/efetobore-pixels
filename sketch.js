let eyeHeight = 100; // Full height when the eye is open
let blinkState = 0;  // 0: Open, 1: Closing, 2: Closed, 3: Opening
let blinkSpeed = 5;  // Speed of the blinking animation
let blinkCounter = 0; 
let isDay = false;
let isNight = false;
let rain = [];
let clouds = [];
let birds = [];
let shirtColor
let isPlaying=false
let glassesOn=false
let isPlayed = true;
let clickSound, clickSound2, clickSound3, birdSound, rainSound, firstMusic, secondMusic;
var leftEyePos, rightEyePos, irisRadius, eyeballRadius;
function preload() {
  clickSound = loadSound('pop1.mp3');
  clickSound2 = loadSound('pop2.mp3');
  clickSound3 = loadSound('pop3.mp3');
  birdSound = loadSound('birds.mp3');
  rainSound = loadSound('Thunder.mp3');
  firstMusic = loadSound('music1.mp3');
  secondMusic = loadSound('music2.mp3');
}

function setup() {
  var canvas = createCanvas(550, 550);
  canvas.parent('sketch-holder');
  let button = createButton("Shirt");
  button.parent("button-holder");
  button.mousePressed(shirtChange);
  
  let button1 = createButton("Sunny");
  button1.parent("button-holder");
  button1.mousePressed(sun);
  
  let button2 = createButton("Storm");
  button2.parent("button-holder");
  button2.mousePressed(storm);
  
  let button3 = createButton("Badge");
  button3.parent("button-holder");
  button3.mousePressed(sign);
  
  let button4 = createButton("Glasses");
  button4.parent("button-holder");
  button4.mousePressed(glasses);
  
  let button5 = createButton("Screen Shot");
  button5.parent("button-holder");
  button5.mousePressed(takeScreenshot);
  
  // let button6 = createButton("Reset");
  // button6.parent("button-holder");
  // button6.mousePressed(resetCanvas);
  
  ellipseMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  shirtColor=color(190,30,45);
  // Define positions and sizes
  leftEyePos = createVector(width*0.41,height*0.455);  // Left eye center
  rightEyePos = createVector(width*0.6,height*0.455);  // Right eye center
  irisRadius = width*0.045/2;  // Iris size
  eyeballRadius = width*0.0875/2;  // Eyeball size
  frameRate(30); // For lighning
  // Create clouds
  for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud());
  }
  //Create bird
  for (let i = 0; i < 10; i++) {
    birds.push(new Bird(random(width), random(height/4)));
  }
}

function draw() {
  background(220);
  drawDay()
  drawTree(width*0.06875, height*0.62125);
  drawFlower(width*0.15625, height*0.64625);
  drawFlower(width*0.2125, height*0.64625);
  drawTree(width*0.8625, height*0.62125);
  drawFlower(width*0.775, height*0.64625);
  drawFlower(width*0.95, height*0.64625);
  if (isDay) {
    drawSunset();
    drawBirds();
    drawClouds();
  } else if (isNight) {
    drawNight();
    drawRain();
    if (random(1) < 0.05) { // Lightning chance (5% each frame)
    drawLightning();
  }
  }
  bodyDrawing();
  if (isPlaying) {
  shirtDesign()
  }
  neckDrawing();
  headDrawing();
  drawIris(leftEyePos);
  drawIris(rightEyePos);
  blinkEye()
  animateBlink();
  if (isNight) {
  drawRain();
  openMouth();
  }
  if (glassesOn) {
  eyeglassesDrawing()
  }
} 

function eyeglassesDrawing() {
  stroke(200)
  strokeWeight(width*0.0075)
  fill(255, 255, 255, 60)
    // Frame for left eye
  ellipse(width*0.4, height*0.45, width*0.15, height*0.125);
  
  // Frame for right eye
  ellipse(width*0.6, height*0.45, width*0.15, height*0.125);
  
  // Bridge
  line(width*0.525, height*0.45, width*0.475, height*0.45);
  
  // Left arm
  line(width*0.325, height*0.45, width*0.275, height*0.375);
  
  // Right arm
  line(width*0.675, height*0.45, width*0.725, height*0.375);
  noStroke()
}
  
function bodyDrawing() { 
  //Body
  noStroke()
  //fill(190,30,45);
  fill(shirtColor)
  arc(width*0.5,height*1,width*0.7725,height*0.49, 180, 360, OPEN);
}
  
function shirtDesign() {
  strokeWeight(width*0.025);
  stroke(255);
  line(width*0.5,height*0.8675,width*0.5,height*0.9425);
  noStroke()
  fill(255)
  ellipse(width*0.475,height*0.8825,width*0.0125,height*0.0125);
  ellipse(width*0.475,height*0.9075,width*0.0125,height*0.0125);
  ellipse(width*0.475,height*0.9325,width*0.0125,height*0.0125);
  ellipse(width*0.525,height*0.8825,width*0.0125,height*0.0125);
  ellipse(width*0.525,height*0.9075,width*0.0125,height*0.0125);
  ellipse(width*0.525,height*0.9325,width*0.0125,height*0.0125);

}
 
function neckDrawing() {
  //Neck
  stroke(117,76,41);
  strokeWeight(width*0.00125);
  fill(139,94,60);
  rect(width*0.5,height*0.74,width*0.185,height*0.0875);
  arc(width*0.5,height*0.775,width*0.1875,height*0.19, 360, 180, OPEN);
}
  
function headDrawing() {
//head
  fill(139, 94, 60);
  arc(width*0.5,height*0.375,width*0.45,height*0.45, 180, 360, OPEN);
  arc(width*0.5,height*0.495,width*0.45,height*0.45, 360, 180, OPEN);
  strokeWeight(0);
  rect(width*0.5, height*0.435, width*0.5075, height*0.1225, 9);
  
  //Hair
  fill(65,64,66);
  arc(width*0.5,height*0.375,width*0.45,height*0.45, 210, 330, OPEN);
  
  //Eyebrows
  arc(width*0.405,height*0.38,width*0.0825,height*0.0225,180,360, OPEN);
  arc(width*0.605,height*0.38,width*0.0825,height*0.0225,180,360, OPEN);
  
  //Eyeballs
  fill(255);
  arc(width*0.41,height*0.455,width*0.0875,height*0.075,155,385, OPEN);
  arc(width*0.6,height*0.455,width*0.0875,height*0.075,155,385, OPEN);
  
  // //Iris
  // fill(60,36,21);
  // ellipse(width*0.41,height*0.4525,width*0.045,height*0.045);
  // ellipse(width*0.6,height*0.4525,width*0.045,height*0.045);
  
  //Nose
  fill(96,57,19);
  arc(width*0.5,height*0.525,width*0.0725,height*0.0575, 360, 180, OPEN);
  
  //Mouth
  fill(60,36,21);
  arc(width*0.5025,height*0.6,width*0.0825,height*0.095, 360, 180, OPEN);
}
function drawIris(eyePos) {
  // Calculate vector from eye center to mouse
  let mousePos=createVector(mouseX, mouseY);
  let offset=p5.Vector.sub(mousePos, eyePos);
  
  // Constrain iris movement within the eyeball radius
  if (offset.mag()>eyeballRadius-irisRadius) {
    offset.setMag(eyeballRadius-irisRadius);
  }
  
  // Draw the iris at the constrained position
  fill(60,36,21);
  ellipse(eyePos.x+offset.x,eyePos.y+offset.y,irisRadius*2,irisRadius*2);
  fill(139,94,60)
  arc(width*0.41,height*0.4525,width*0.1,height*0.1,25,155,OPEN)
  arc(width*0.6,height*0.4525,width*0.1,height*0.1,25,155,OPEN)
}
function blinkEye() {
  noStroke()
  fill(139, 94, 60);
  // ellipse(164,181,40,eyeHeight)
  // ellipse(240,181,40,eyeHeight)
  rect(width*0.4075,height*0.435,width*0.1125,map(eyeHeight, 0, 100, height * 0.1, 0))
  rect(width*0.6,height*0.435,width*0.1125,map(eyeHeight, 0, 100, height * 0.1, 0))
}
function animateBlink() {
  // Blink periodically
  blinkCounter++;

  if (blinkCounter > 100) { // Blink every 100 frames
    if (blinkState === 0) {
      blinkState = 1; // Start closing the eyelid
    }
  }

  // Control eyelid animation
  if (blinkState === 1) {
    eyeHeight -= blinkSpeed;  // Close the eye
    if (eyeHeight <= 0) {
      eyeHeight = 0;
      blinkState = 2;  // Eye fully closed
    }
  } else if (blinkState === 2) {
    blinkCounter = 0;  // Pause briefly with eye closed
    blinkState = 3;    // Start opening
  } else if (blinkState === 3) {
    eyeHeight += blinkSpeed;  // Open the eye
    if (eyeHeight >= 100) {
      eyeHeight = 100;
      blinkState = 0;  // Eye fully open, go back to rest state
    }
  }
}
function openMouth() {
  //Mouth
  noStroke()
  fill(255);
  arc(width*0.5025,height*0.62,width*0.055,height*0.055, 40, 140, OPEN);
  arc(width*0.5025,height*0.5875,width*0.055,height*0.055, 30, 150, OPEN);
}
function shirtChange() {
 clickSound.play();
 shirtColor=color(random(255), random(255), random(255));
}
function drawDay() {
  //firstMusic.loop();
  fill(209,238,251);
  rect(width*0.5,height*0.325,width*1,height*0.645);
  fill(78,183,72,50);
  rect(width*0.5,height*0.825,width*1,height*0.3575);
}
function drawSunset() {
  fill(255, 204, 0);
  ellipse(width / 1.2, height /10, 60, 60);
}

function drawNight() {
  // Background is dark (night)
  background(20, 24, 40);

  // Draw the moon
  fill(255, 255, 204);
  ellipse(width / 6, height / 10, 60, 60);
}
function drawLightning() {
  rect(400,400,800,800);
  stroke(255); // Lightning color
  strokeWeight(height*0.0071);

  // Start point of lightning (randomly along top of canvas)
  let startX = random(width);
  let startY = 0;

  let x = startX;
  let y = startY;

  // Draw a series of random segments to create a lightning strike
  while (y < height) {
    let branchLength = random(width*0.0125, height*0.025);
    let angle = random(-PI / 4, PI / 4);

    let newX = x + cos(angle) * branchLength;
    let newY = y + (PI ) * branchLength; // Move down

    line(x, y, newX, newY);

    x = newX;
    y = newY;

    // Random chance to stop drawing lightning (like branching off)
    if (random(1) < 0.1) {
      break;
    }
  }
}

function drawRain() {
  // Show and update all rain drops
  for (let drop of rain) {
    drop.update();
    drop.show();
  }
}
  function drawClouds() {
  // Show and update all clouds
  for (let cloud of clouds) {
    cloud.update();
    cloud.show();
  }
}
function drawBirds() {  
  for (let bird of birds) {
    bird.update();
    bird.display();
  }
}

class Rain {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -10);  // Start off-screen
    this.yspeed = random(4, 10); // Random speed
  }

  update() {
    // Make the rain drop fall down
    this.y += this.yspeed;

    // If the rain drop falls off the screen, reset its position
    if (this.y > height) {
      this.y = random(-100, -10);
      this.yspeed = random(4, 10);
    }
  }

  show() {
    // Draw a line to represent the rain drop
    stroke(255, 255, 255);
    line(this.x, this.y, this.x, this.y + 10);
  }
}
// Class for moving clouds
class Cloud {
  constructor() {
    this.x = random(width); // Random starting position
    this.y = random(50, 150); // Cloud height
    this.size = random(50, 100); // Random size of clouds
    this.xspeed = random(1, 2); // Speed of clouds
  }

  update() {
    // Move the cloud horizontally
    this.x += this.xspeed;
    
    // If the cloud goes off the screen, wrap it around
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }

  show() {
    // Draw a cloud (simple ellipse-based shape)
    noStroke();
    fill(255, 255, 255, 230);
    ellipse(this.x, this.y, this.size, this.size / 2);
    ellipse(this.x + this.size / 2, this.y + 10, this.size / 1.5, this.size / 3);
    ellipse(this.x - this.size / 2, this.y + 10, this.size / 1.5, this.size / 3);
  }
}
class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = height*0.00714;
    this.speedX = random(1, 3);
    this.speedY = random(-1, 1);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around the canvas edges
    if (this.x > width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }

    if (this.y > height/2) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height/2;
    }
  }

  display() {
    // Draw a simple bird shape (a "V")
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x - this.size, this.y + this.size / 2);
    vertex(this.x, this.y + this.size);
    endShape();
  }
}    

// Handle key presses
function sun() {
    isDay = true;
    isNight = false;
    // firstMusic.loop();
    birdSound.loop();   // Play bird sound in a loop during the day
    rainSound.stop();   // Stop rain sound if playing
}
function storm() {
    isNight = true;
    isDay = false;
 
    // Create new rain drops for night scene
    rain = [];
    for (let i = 0; i < 100; i++) {
      rain.push(new Rain());
  }
    rainSound.loop();   // Play rain sound in a loop during the night
    birdSound.stop();   // Stop bird sound if playing
    firstMusic.stop();
} 
  
function sign() {
  clickSound2.play();
  isPlaying = !isPlaying;
  }
  function glasses() {
  clickSound3.play();
  glassesOn = !glassesOn
  }

function drawTree(x, y) {
  // Tree trunk
  fill(101, 67, 33);  // Brown color for the trunk
  rect(x, y-4, width*0.025, height*0.0625);  // Draw trunk

  // Tree leaves
  fill(34, 139, 34);  // Green color for the leaves
  ellipse(x, y - 35, width*0.075, height*0.075);  // Top
  ellipse(x - 20, y - 25, width*0.075, height*0.075);  // Left
  ellipse(x + 20, y - 25, width*0.075, height*0.075);  // Right
}

function drawFlower(x, y) {
  // Flower stem
  stroke(0, 128, 0);  // Green color for the stem
  strokeWeight(width*0.00375);
  line(x, y, x, y - 50);  // Draw stem

  // Flower petals
  noStroke();
  fill(255, 0, 0);  // Red color for petals
  ellipse(x - 10, y - 60, width*0.025, height*0.025);  // Left petal
  ellipse(x + 10, y - 60, width*0.025, height*0.025);  // Right petal
  ellipse(x, y - 70, width*0.025, height*0.025);  // Top petal
  ellipse(x, y - 50, width*0.025, height*0.025);  // Bottom petal

  // Flower center
  fill(255, 215, 0);  // Yellow color for the center
  ellipse(x, y - 60, width*0.01875, height*0.01875);  // Draw center
}
function takeScreenshot() {
  saveCanvas('Screenshot', 'png');
}
// function resetCanvas() {
//   clear(); // Clears the canvas
// }
