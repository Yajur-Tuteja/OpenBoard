let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".fa-file-arrow-down");
let redo = document.querySelector(".fa-rotate-right");
let undo = document.querySelector(".fa-rotate-left");

let undoRedoTracker = []; //Data
let track = 0; //index from tracker array

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let mouseIsDown = false;

// API
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// mousedown -> start new path
// mousemove -> path fill (graphics)

canvas.addEventListener("mousedown", (e) => {
    console.log("begin");
    mouseIsDown = true;
    // beginPath({
    //     x: e.clientX,
    //     y: e.clientY
    // });
    let data = {
        x: e.clientX,
        y: e.clientY
    }
    socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", (e) => {
    if (mouseIsDown) {
        let data = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? eraserColor : penColor,
            width: eraserFlag ? eraserWidth : penWidth
        }
        // send data to server
        socket.emit("drawStroke", data);
        // drawStroke({
        //     x: e.clientX,
        //     y: e.clientY,
        //     color: eraserFlag ? eraserColor : penColor,
        //     width: eraserFlag ? eraserWidth : penWidth
        // });
    }
});

canvas.addEventListener("mouseup", (e) => {
    mouseIsDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
});

undo.addEventListener("click", (e) => {
    console.log("begin");
    if (track >= 0) track--;

    // tool.clearRect(0, 0, canvas.width, canvas.height);
    // track action
    // let trackObj = {
    //     trackValue: track,
    //     undoRedoTracker
    // };
    // undoRedoCanvas(trackObj)
    let data = {
        trackValue: track,
        undoRedoTracker
    };
    socket.emit("undoRedo", data);
});

redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length - 1) track++;

    // tool.clearRect(0, 0, canvas.width, canvas.height);
    // track action
    // let trackObj = {
    //     trackValue: track,
    //     undoRedoTracker
    // };
    // undoRedoCanvas(trackObj);
    let data = {
        trackValue: track,
        undoRedoTracker
    };
    socket.emit("undoRedo", data);
});

function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    tool.clearRect(0, 0, canvas.width, canvas.height);

    console.log(track)
    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src = url;
    img.onload = (e) => {
        console.log(url);
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    });
});

pencilWidthElem.addEventListener("change", (e) => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
});

eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
});

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
});

socket.on("beginPath", (data) => {
    // data -> data from server
    beginPath(data);
});

socket.on("drawStroke", (data) => {
    // data -> data from server
    drawStroke(data);
});

socket.on("undoRedo", (data) => {
    undoRedoCanvas(data);
});

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth
    } else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth
    }
});