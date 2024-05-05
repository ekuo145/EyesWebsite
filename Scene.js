'use strict';

function setup() {
  // let cnv = createCanvas(windowWidth, windowHeight);
  // cnv.parent('content');
  noStroke();
}
function draw() {  
  document.getElementById('scrollArrow').style.transform = `translate(0, ${Math.sin(frameCount / 13) * 10}px)`;
  // background(255);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}