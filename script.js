const tHeadRow = document.getElementById('table-heading-row');
const tBody = document.getElementById('table-body');
const boldButton = document.getElementById('bold-btn');
const italicsButton = document.getElementById('italics-btn');
const underlineButton = document.getElementById('underline-btn');
const leftAlign = document.getElementById('left-align');
const centerAlign = document.getElementById('center-align');
const rightAlign = document.getElementById('right-align');
const fontSizeDropDown = document.getElementById('font-size');
const fontStyleDropDown = document.getElementById('font-style');
const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const cutButton = document.getElementById('cut-button');
const copyButton = document.getElementById('copy-button');
const pasteButton = document.getElementById('paste-button');
const uploadJsonFile = document.getElementById('jsonFile');
const addSheetButton = document.getElementById('add-sheet-button');
const buttonContainer = document.getElementById('button-container');
const sheetNo = document.getElementById('sheet-no');
const arrMatrix = 'arrMatrix';

let cutCell = {};
let numSheets = 1;
let currSheetNum = 1;

let currentCell;
const columns = 26;
const rows = 100;

// `arrMatrix` - [matrix1,matrix2,matrix3]

addSheetButton.addEventListener('click', () => {
    const btn = document.createElement('button');
    numSheets++;
    currSheetNum = numSheets;
    btn.innerText = `Sheet ${numSheets}`;
    btn.setAttribute('id', `sheet-${currSheetNum}`);
    btn.setAttribute('onclick', 'viewSheet(event)');
    buttonContainer.append(btn);
    if (localStorage.getItem(arrMatrix)) {
        var oldMatrixArr = localStorage.getItem(arrMatrix);
        // oldMatrixArr -> string
        var newMatrixArr = [...JSON.parse(oldMatrixArr), matrix];
        localStorage.setItem(arrMatrix, JSON.stringify(newMatrixArr));
    } else {
        let tempMatrixArr = [matrix];
        localStorage.setItem(arrMatrix, JSON.stringify(tempMatrixArr));
    }

    // cleanup my virtual memory
    for (let row = 0; row < rows; row++) {
        matrix[row] = new Array(columns);
        for (let col = 0; col < columns; col++) {
            matrix[row][col] = {};
        }
    }
    sheetNo.innerText = "Sheet No - " + currSheetNum;
    tBody.innerHTML = ``;
    // repeated Code please make function (DIY)
    for (let row = 1; row <= rows; row++) { // Row -> 1-100
        // i create a tr
        let tr = document.createElement('tr');
        // number cell
        let th = document.createElement('th');
        // injecting number in th
        th.innerText = row;
        tr.append(th);
        for (let col = 0; col < columns; col++) { //COL-> 0->26 // A->Z
            let td = document.createElement('td');
            td.setAttribute('contenteditable', 'true');
            // unique row and unique col
            // ColRow
            td.setAttribute('id', `${String.fromCharCode(col + 65)}${row}`);
            // this event will revolve around input
            td.addEventListener('input', (event) => onInputFn(event));

            // this event revolves around focus on a cell
            td.addEventListener('focus', (event) => onFocusFn(event));
            tr.append(td);
        }
        tBody.append(tr);
    }

})



for (let col = 0; col < columns; col++) {
    let th = document.createElement('th');
    // col -> 0 
    th.innerText = String.fromCharCode(col + 65);
    tHeadRow.append(th);
}

for (let row = 1; row <= rows; row++) { // Row -> 1-100
    // i create a tr
    let tr = document.createElement('tr');
    // number cell
    let th = document.createElement('th');
    // injecting number in th
    th.innerText = row;
    tr.append(th);
    for (let col = 0; col < columns; col++) { //COL-> 0->26 // A->Z
        let td = document.createElement('td');
        td.setAttribute('contenteditable', 'true');
        // unique row and unique col
        // ColRow
        td.setAttribute('id', `${String.fromCharCode(col + 65)}${row}`);
        // this event will revolve around input
        td.addEventListener('input', (event) => onInputFn(event));

        // this event revolves around focus on a cell
        td.addEventListener('focus', (event) => onFocusFn(event));
        tr.append(td);
    }
    tBody.append(tr);
}

// forming of outer array
let matrix = new Array(rows);
// let matrix=[];
for (let row = 0; row < rows; row++) {
    matrix[row] = new Array(columns);
    for (col = 0; col < columns; col++) {
        matrix[row][col] = {};
    }
}

function onInputFn(event) {
    updateMatrix(event.target);
    // console.log(event.target);
    // id
    // cell content -> innerText
    // cell style -> cssText
}

function updateMatrix(currentCell) {
    let tempObj = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
        id: currentCell.id,
    }
    // A1, A2, B6
    // `${j}${i}`
    let j = currentCell.id[0].charCodeAt(0) - 65; /// this is col
    // currentCell.id[0] -> this will give me character
    // str.chatCodeAt(i) will give me respective ascii at ith index of string str
    // -65 for making ascii code to 0th index
    let i = currentCell.id.substr(1) - 1;
    matrix[i][j] = tempObj;
    // console.log(matrix);
}

function onFocusFn(event) {
    currentCell = event.target;
    document.getElementById('current-cell').innerText = currentCell.id;
    if (currentCell.style.fontWeight === 'bold') {
        boldButton.style.backgroundColor = 'yellow';
    }
    else boldButton.style.backgroundColor = 'transparent';
}

boldButton.addEventListener('click', () => {
    if (currentCell.style.fontWeight === 'bold') {
        currentCell.style.fontWeight = 'normal';
    }
    else {
        currentCell.style.fontWeight = 'bold';
        boldButton.style.backgroundColor = 'yellow';
    }
    // latest style should be passed to updated matrix
    updateMatrix(currentCell);
    // currentCell.style.fontWeight = currentCell.style.fontWeight==='bold'? 'normal':'bold';
})

italicsButton.addEventListener('click', () => {
    if (currentCell.style.fontStyle === 'italic') {
        currentCell.style.fontStyle = 'normal';
    }
    else currentCell.style.fontStyle = 'italic';

    updateMatrix(currentCell);
})

underlineButton.addEventListener('click', () => {
    if (currentCell.style.textDecoration === 'underline') {
        currentCell.style.textDecoration = 'none';
    }
    else currentCell.style.textDecoration = 'underline';

    updateMatrix(currentCell);
})

leftAlign.addEventListener('click', () => {
    currentCell.style.textAlign = 'left';
    updateMatrix(currentCell);
})

rightAlign.addEventListener('click', () => {
    currentCell.style.textAlign = 'right';
    updateMatrix(currentCell);
})

centerAlign.addEventListener('click', () => {
    currentCell.style.textAlign = 'center'; /// changing style of a particular cell in 
    // table
    updateMatrix(currentCell);
})

fontSizeDropDown.addEventListener('change', () => {
    // what ever option tag is chosen by the end user is
    // mapped with select tag with value attribute
    currentCell.style.fontSize = fontSizeDropDown.value;
    updateMatrix(currentCell);
})

fontStyleDropDown.addEventListener('change', () => {
    // what ever option tag is chosen by the end user is
    // mapped with select tag with value attribute
    currentCell.style.fontFamily = fontStyleDropDown.value;
    updateMatrix(currentCell);
})

// see the diff between input and change

textColorInput.addEventListener('input', () => {
    currentCell.style.color = textColorInput.value;
    updateMatrix(currentCell);
})


bgColorInput.addEventListener('change', () => {
    currentCell.style.backgroundColor = bgColorInput.value;
    updateMatrix(currentCell);
})


cutButton.addEventListener('click', () => {
    cutCell = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
    }
    currentCell.innerText = '';
    currentCell.style.cssText = '';
    updateMatrix(currentCell);
})

copyButton.addEventListener('click', () => {
    cutCell = {
        style: currentCell.style.cssText,
        text: currentCell.innerText,
    }
    // I don't need to delete anything here
    // currentCell.innerText='';
    // currentCell.style.cssText='';
})

pasteButton.addEventListener('click', () => {
    currentCell.innerText = cutCell.text;
    currentCell.style.cssText = cutCell.style;
    updateMatrix(currentCell);
})

function downloadJson() {
    // 2d matrix into string
    const matrixString = JSON.stringify(matrix);

    // text form of matrix -> piece of memory (downloadable)
    // application/json -> format for json
    const blob = new Blob([matrixString], { type: 'application/json' });
    // link created -> attach href
    // click link
    // delete link
    const link = document.createElement('a');
    // 211 -> converting piece of memory to downloadable link
    link.href = URL.createObjectURL(blob);
    // download the link instead of opening it
    // link.download -> file name
    link.download = 'table.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// visible table -> virtual memory
// virtual memory -> phyical table

// 14 -> 22 (you triggered a change event)

// [ 
//  [{},{}],
//  [{},{}],
//  [{},{}],
// ]

// A2

// 1st row, col -> 0th

// A2 -> 1,0
// let row=id.substring(1); // 2
// let col=id[0]; // 'A' -> 65
// twoDArray[1][0]


// user clicks on download button.
// row * col
// 1st -> you traverse over table -> copy evey cell
// and then give that 2d matrix to the download

// constant
// 2nd -> you give the matrix
// when user is editing 

// constant operation
// 2d matrix

// both the contest discussion
// promises extra class
// call apply & bind

// 7:45 is doubt time
// kudos to Diptendu


// visible table (user visual memory)
// virtual memory (2d matrix)


// cell -> event triggred -> function updateCell(id,content)
// content -> cell text and style
// 

// input and change they will work same in this event
uploadJsonFile.addEventListener('change', uploadJSONFileFn);


//   let tempObj = {
//     style: currentCell.style.cssText,
//     text: currentCell.innerText,
//     id: currentCell.id,
// }

function uploadJSONFileFn(event) {
    const file = event.target.files[0];
    if (file) {
        // this can read external file
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            const fileContent = e.target.result;
            try {
                // updated my matrix
                matrix = JSON.parse(fileContent);
                matrix.forEach(row => {
                    row.forEach(cell => {
                        if (cell.id) {
                            let cellToBeEdtited = document.getElementById(cell.id);
                            cellToBeEdtited.innerText = cell.text;
                            cellToBeEdtited.style.cssText = cell.style;
                        }
                        // else empty object-> do nothing
                    })
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        // how you you trigger reader?
        // .readAsText method will trigger reader
        // .onload method is having my default function
    }
}


// uploading a JSON file
// matrix
// table

function viewSheet(event) {
    let id = event.target.id.split('-')[1];
    var matrixArr = JSON.parse(localStorage.getItem(arrMatrix));
    matrix = matrixArr[id - 1];
    // current matrix points towards the latest currentSheet;
    // clean previousTable
    tBody.innerHTML = ``;
    // repeated Code please make function (DIY)
    for (let row = 1; row <= rows; row++) { // Row -> 1-100
        // i create a tr
        let tr = document.createElement('tr');
        // number cell
        let th = document.createElement('th');
        // injecting number in th
        th.innerText = row;
        tr.append(th);
        for (let col = 0; col < columns; col++) { //COL-> 0->26 // A->Z
            let td = document.createElement('td');
            td.setAttribute('contenteditable', 'true');
            // unique row and unique col
            // ColRow
            td.setAttribute('id', `${String.fromCharCode(col + 65)}${row}`);
            // this event will revolve around input
            td.addEventListener('input', (event) => onInputFn(event));

            // this event revolves around focus on a cell
            td.addEventListener('focus', (event) => onFocusFn(event));
            tr.append(td);
        }
        tBody.append(tr);
    }
    matrix.forEach(row => {
        row.forEach(cell => {
            if (cell.id) {
                var myCell = document.getElementById(cell.id);
                myCell.innerText = cell.text;
                myCell.style.cssText = cell.style;
            }
        })
    })
    currSheetNum=id;
    sheetNo.innerText = "Sheet No - " + currSheetNum;
}