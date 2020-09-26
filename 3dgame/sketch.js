let posX = -500;
let posY = 0;
let posZ = -200;
let lookX = 1;
let lookY = 0;
let lookZ = 0;

function setup() {
    createCanvas(854, 480, WEBGL);
}

function draw() {
    background(200);
    ambientLight(128, 128, 128);
    directionalLight(255, 255, 255, 0.4, 0.4, 0.8);

    // push();
    // textSize(32);
    // stroke(0, 0, 0);
    // fill(0, 0, 0);
    // text('Move: W A S D', 10, 30);
    // text('Look: Up Down Left Right', 10, 50);
    // pop();

    // Movement
    let walkForward = keyIsDown(87); // W
    let walkBack = keyIsDown(83); // S
    let walkLeft = keyIsDown(65); // A
    let walkRight = keyIsDown(68); // D

    let walk = false;
    let dirV = createVector(lookX, lookY);
    if (walkForward && !walkBack && !walkLeft && !walkRight) {
        walk = true;
    } else if (!walkForward && walkBack && !walkLeft && !walkRight) {
        dirV = dirV.rotate(PI);
        walk = true;
    } else if (!walkForward && !walkBack && walkLeft && !walkRight) {
        dirV = dirV.rotate(HALF_PI);
        walk = true;
    } else if (!walkForward && !walkBack && !walkLeft && walkRight) {
        dirV = dirV.rotate(-HALF_PI);
        walk = true;
    } else if (walkForward && !walkBack && walkLeft && !walkRight) {
        dirV = dirV.rotate(QUARTER_PI);
        walk = true;
    } else if (walkForward && !walkBack && !walkLeft && walkRight) {
        dirV = dirV.rotate(-QUARTER_PI);
        walk = true;
    } else if (!walkForward && walkBack && walkLeft && !walkRight) {
        dirV = dirV.rotate(QUARTER_PI + HALF_PI);
        walk = true;
    } else if (!walkForward && walkBack && !walkLeft && walkRight) {
        dirV = dirV.rotate(-QUARTER_PI - HALF_PI);
        walk = true;
    }
    if (walk) {
        posX += dirV.x * 4;
        posY += dirV.y * 4;
    }

    // Look Direction
    let lookUp = keyIsDown(UP_ARROW);
    let lookDown = keyIsDown(DOWN_ARROW);
    let lookLeft = keyIsDown(LEFT_ARROW);
    let lookRight = keyIsDown(RIGHT_ARROW);

    dirV = createVector(lookX, lookY);
    if (lookLeft) {
        dirV = dirV.rotate(0.02);
        lookX = dirV.x;
        lookY = dirV.y;
    }
    if (lookRight) {
        dirV = dirV.rotate(-0.02);
        lookX = dirV.x;
        lookY = dirV.y;
    }
    // print("x: " + lookX + ", y: " + lookY);

    if (lookUp) {
        lookZ -= 0.02;
        if (lookZ < -HALF_PI + 0.1)
            lookZ = -HALF_PI + 0.1;
    }
    if (lookDown) {
        lookZ += 0.02;
        if (lookZ > HALF_PI - 0.1)
            lookZ = HALF_PI - 0.1;
    }
    dirV = createVector(lookX, lookY);
    dirV = dirV.mult(cos(abs(lookZ)));
    // print("dirV.x: " + dirV.x + ", dirV.y: " + dirV.y + ", lookZ: " + lookZ);

    // Draw Camera
    camera(posX, posY, posZ, posX + dirV.x, posY + dirV.y, posZ + lookZ, 0, 0, 1);

    // Green Box
    push();
    stroke(0, 0, 0);
    fill(0, 255, 0);
    translate(0, -100);
    box(50, 100, 20);
    pop();

    push();
    stroke(0, 0, 0);
    fill(0, 255, 0);
    translate(0, -100, -400);
    box(50, 100, 20);
    pop();

    // Yellow Box
    push();
    stroke(0, 0, 0);
    fill(255, 255, 0);
    translate(0, 0);
    box(50, 100, 20);
    pop();

    push();
    stroke(0, 0, 0);
    fill(255, 255, 0);
    translate(0, 0, -400);
    box(50, 100, 20);
    pop();

    // Blue Box
    push();
    stroke(0, 0, 0);
    fill(0, 0, 255);
    translate(0, 100);
    box(50, 100, 20);
    pop();

    push();
    stroke(0, 0, 0);
    fill(0, 0, 255);
    translate(0, 100, -400);
    box(50, 100, 20);
    pop();
}