let toolsCont = document.querySelector(".tools-cont");

let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;

let pencilToolCont = document.querySelector(".pencil-tool-cont");
let pencilFlag = false;
let pencil = document.querySelector('.fa-pencil');

let eraserToolCont = document.querySelector(".eraser-tool-cont");
let eraserFlag = false;
let eraser = document.querySelector('.fa-eraser');

let sticky = document.querySelector('.fa-note-sticky');

let upload = document.querySelector('.fa-cloud-arrow-up')

//true -> show tools, false -> hide tools
optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;

    if (optionsFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-xmark");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";

}
function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-xmark");
    toolsCont.style.display = "none";

    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
    // true -> show pencil tool, flase -> hide pencil tool
    pencilFlag = !pencilFlag;

    if (pencilFlag) pencilToolCont.style.display = "block";
    else pencilToolCont.style.display = "none";
});

eraser.addEventListener("click", (e) => {
    // true -> show peraser tool, flase -> hide eraser tool
    eraserFlag = !eraserFlag;

    if (eraserFlag) eraserToolCont.style.display = "flex";
    else eraserToolCont.style.display = "none";
});

upload.addEventListener("click", (e) => {
    // open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
            <div class="header-cont">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="note-cont">
                <img src="${url}"/>
            </div>
        `;
        createSticky(stickyTemplateHTML);
    })
});

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector('.minimize');
    let remove = stickyCont.querySelector('.remove');
    noteActions(minimize, remove, stickyCont)

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellCheck="false"></textarea>
    </div>
    `;
    createSticky(stickyTemplateHTML);
});

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    });
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");

        if (display === "none") noteCont.style.display = "block"
        else noteCont.style.display = "none"
    })

}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

}
