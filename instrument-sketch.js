function setup() {
     
    let container = document.getElementById('p5-canvas-container');
    
    let w = container.clientWidth;
    let h = container.clientHeight;
    
    let canvas = createCanvas(w, h);
    canvas.parent('p5-canvas-container');

    unit =  Math.min(innerWidth, innerHeight)/9;
    x0 = width/2;
    y0 = height/2;
    thetaX = 0;
    thetaY = 0;
    thetaZ = 0;
}

function draw() {
    clear();
    stroke(0);
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        strokeWeight(1);
//        line(x0,0,x0,height);
  //      line(0,y0,width,y0);
        line(mouseX,0,mouseX,height);
        line(0,mouseY,width,mouseY);
        strokeWeight(5);

        thetaX = map(mouseX,0,width,-Math.PI,Math.PI);
        thetaY = map(mouseY,0,height,-Math.PI,Math.PI);
        
    }
    strokeWeight(5);
    
    thetaX = Math.round(thetaX / (2*Math.PI / 64)) * (2*Math.PI /64);
    thetaY = Math.round(thetaY / (2*Math.PI / 64)) * (2*Math.PI /64);

    stroke("red");
    fill("red");
    line(x0-2*unit,y0,x0 - 2*unit + unit*Math.sin(2*thetaX),y0 + unit*Math.cos(2*thetaX));
    circle(x0-2*unit,y0,unit/10);
    circle(x0-2*unit + unit*Math.sin(2*thetaX),y0 + unit*Math.cos(2*thetaX),unit/10);

    stroke("green");
    fill("green");
    line(x0,y0,x0 + unit*Math.sin(2*thetaY),y0 + unit*Math.cos(2*thetaY));
    circle(x0,y0,unit/10);
    circle(x0 + unit*Math.sin(2*thetaY),y0 + unit*Math.cos(2*thetaY),unit/10);
    
    stroke("blue");
    fill("blue");
    line(x0 + 2*unit,y0,x0 + 2*unit + unit*Math.sin(2*thetaZ),y0 + unit*Math.cos(2*thetaZ));
    circle(x0 + 2*unit,y0,unit/10);
    circle(x0 + 2*unit + unit*Math.sin(2*thetaZ),y0 + unit*Math.cos(2*thetaZ),unit/10);    

    
}


function mouseWheel(event) {
    if(event.delta > 0){ 
        thetaZ += 2*Math.PI/32;
    }
    else{
        thetaZ -= 2*Math.PI/32;
    }
}

