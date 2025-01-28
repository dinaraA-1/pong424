let w = 600
let h = 300
let p1,p2
paddleW =15
paddleH = 85
let colors = ['black']
ballD = 30


class Paddle{
  constructor(x,y,w, h){
    this.x = x 
    this.y = y
    this.w = w
    this.h = h
    this.speed = 2
    this.color = random(colors)
    this.score = 0
  }
  
  draw(){
    fill(this.color)
    noStroke()
    rect(this.x,this.y, this.w, this.h)
  }
  
  
  update(){
    this.y += this.speed
    this.y = constrain(this.y, 0, h-this.h)
  }
  
  
  move(direction) {
    this.speed = direction * 8
   }
  upScore(){
    this.score +=1
  }
}

class Ball{
  constructor(x,y,d) {
  this.x = x
  this.y = y
  this.d = d
  this.color = random(colors)
  this.speedX = 0
  this.speedY = 0

  }
  draw(){
    
    fill(this.color)
    noStroke()
    ellipse(this.x, this.y, this.d)
   
 } 
  
  start(){
  this.speedX = random([-2,2])
  this.speedY = random([-2,2])
  }
  
  rematch(){
  this.x = w/2
  this.y = h/2
  this.speedX = 0
  this.speedY = 0 
  }
  
  reflect(xdir,ydir){
    this.speedX = this.speedX*xdir
    this.speedY = this.speedY*ydir
    
  }
  
  
  update(){ 
    // отскок мяча от пола
    this.x += this.speedX
    this.y += this.speedY
    
    if(this.y - this.d / 2 < 0){
      this.reflect(1,-1)
    }
     
    if(this.y + this.d / 2 > h){
      this.reflect(1,-1)
    }
    // отскок мячa от ракеток
    //правая ракетка
    if(this.x + this.d / 2 > w){
      if(this.y > p2.y && this.y < p2.y + p2.h){
    this.reflect(-1,1)
      
  this.speedX *= 1.3
  this.speedY *= 1.3
      }
     
    
 else{
   this.rematch()
   p1.upScore()
 }
 }   
    
    
    //левая 
     if(this.x - this.d/2 < 0){
      if(this.y > p1.y && this.y < p1.y + p1.h){
    this.reflect(-1,1)
      
  this.speedX *= 1.3
  this.speedY *= 1.3
      }
       
    else{
   this.rematch()
    p2.upScore()}   
       
}
 
}
  
}
function setup() {
  createCanvas(w, h);
  //создали ракетки
  p1 = new Paddle (0,100,paddleW, paddleH)//w.s
  p2 = new Paddle (w-paddleW,100,paddleW, paddleH)//a.z
  
  //создали ball
  gameBall = new Ball(w/2, h/2, ballD)
 // gameBall.start()

}


function draw() {
  background('maroon');

  fill('red')
  noStroke()
rect(0,0,w/2,h)
  
  textSize(48)
  fill(p1.color)
  noStroke()
  strokeWeight(4)
  text(p1.score, w/2-70,50)
  fill(p2.color)
  text(p2.score, w/2+50,50)
  
  fill(0)
  text(':', w/2-6,50)
  
  gameBall.draw()
  gameBall.update()
  
  
  p1.draw()
  p2.draw()
  p1.update()
  p2.update()

  
}

function keyPressed (){
  if(key === 'a'){
    p1.move(-1);
  }
  else if (key === 'z'){
    p1.move(1);
  }
  
   if(key === 'w'){
    p2.move(-1);
  }
  else if (key === 's'){
    p2.move(1);
  }
  if(keyCode ==32){
    gameBall.start()
  }
}


function keyReleased(){
  if (key === 'a' || key === 'z') {
    p1.move(0)
  }
  
  
  if (key === 'w' || key === 's') {
    p2.move(0)
  }
}
