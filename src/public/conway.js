let grid;

const width = 400;
const height = 400;
let status = 0;

const cols = 40;
const rows = 40;

const cellSize = width / cols;

let intervalId;

let cyclesCounter = 0;

function setup() {
    const canvas = createCanvas(width, height);
    canvas.parent('canvas-container');

    grid = new Grid(cols, rows, cellSize, 'createRandomSpace');
    grid.draw();

    document.getElementById('startButton').addEventListener("click", () => play());
    document.getElementById('stopButton').addEventListener("click", () => stop());
    document.getElementById('cycleCounter').innerHTML = cyclesCounter;
}

function mousePressed() {
    grid.mousePressed(mouseX, mouseY);
    grid.draw();
}


function play() {
    if (status !== 0) {
        return;
    }

    status = 1;

    intervalId = setInterval(function () {
        grid.cycle();
        cyclesCounter++;
        document.getElementById('cycleCounter').innerHTML = cyclesCounter;
    }, 1000)
}



function stop() {
    if (status !== 1) {
        return;
    }

    status = 0;

    clearInterval(intervalId);
}

function loop() {
    while (status === 1) {

    }
}

function randomGenerator() {

}

