const jsChessEngine = require('js-chess-engine');
const game = new jsChessEngine.Game();
let possibleMoves = [];
let selectedPlace;
console.log(game);

window.onload = () => {
    let table = document.getElementById('game-field');
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 8; j++) {
            let td = document.createElement("td");
            td.onclick = () => clickFigure(i, j);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    renderFigure();
    initMenu();
}

function initMenu() {
    document.getElementById("button-monkey").onclick = () => {
        level = 0;
        startGame();
    }
    document.getElementById("button-beginner").onclick = () => {
        level = 1;
        startGame();
    }
    document.getElementById("button-intermediate").onclick = () => {
        level = 2;
        startGame();
    }
    document.getElementById("button-advanced").onclick = () => {
        level = 3;
        startGame();
    }
    document.getElementById("button-experienced").onclick = () => {
        level = 4;
        startGame();
    }
}

function startGame() {
    document.getElementById("menu").style["display"] = "none";
}

/*
    https://ru.wikipedia.org/wiki/Нотация_Форсайта_—_Эдвардса
    Белые фигуры обозначаются заглавными буквами. 
    K, Q, R, B, N, P — соответственно белые король, ферзь, ладья, слон, конь, пешка. 
    k, q, r, b, n, p — соответственно чёрные король, ферзь, ладья, слон, конь, пешка.
    
 */

// Перевод позиции из формата A1..H8 в индексы массива
function placeToIndex(place) {
    let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let row = 8 - Number.parseInt(place[1]);
    let column = chars.indexOf(place[0]);
    return { row, column }
}

// Перевод позиции из индексов массива в формат A1..H8
function indexToPlace(row, column) {
    let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return chars[column] + (8 - row);
}

function renderFigure() {
    clearTable();
    let { pieces } = game.board.configuration;
    for (let p in pieces) {
        let { row, column } = placeToIndex(p);
        let figure = pieces[p];
        switch (figure) {
            case "P":
                putFigure(row, column, "white-pawn")
                break;
            case "N":
                putFigure(row, column, "white-horse")
                break;
            case "B":
                putFigure(row, column, "white-elefan")
                break;
            case "R":
                putFigure(row, column, "white-rook")
                break;
            case "Q":
                putFigure(row, column, "white_queen")
                break;
            case "K":
                putFigure(row, column, "white-king")
                break;
            case "p":
                putFigure(row, column, "black-pawn")
                break;
            case "n":
                putFigure(row, column, "black-horse")
                break;
            case "b":
                putFigure(row, column, "black-elefan")
                break;
            case "r":
                putFigure(row, column, "black-rook")
                break;
            case "q":
                putFigure(row, column, "black_queen")
                break;
            case "k":
                putFigure(row, column, "black-king")
                break;
        }
    }
    renderPossibleMoves();
}

function clearTable() {
    let table = document.getElementById('game-field');
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let td = table.children[row].children[column];
            td.innerHTML = "";
        }
    }
}

function putFigure(row, column, figure) {
    let table = document.getElementById('game-field');
    let td = table.children[row].children[column];
    td.innerHTML = "";
    let div = document.createElement("div");
    div.classList.add(figure);
    div.classList.add('figure');
    td.appendChild(div);
}

function renderPossibleMoves() {
    if (possibleMoves.length > 0) {
        let table = document.getElementById('game-field');
        for (let move of possibleMoves) {
            let { row, column } = placeToIndex(move);
            console.log(row, column);
            let td = table.children[row].children[column];
            let div = document.createElement("div");
            div.classList.add('possible-move');
            td.appendChild(div);
        }
    }
}

function clickFigure(row, column) {
    let place = indexToPlace(row, column);
    if (possibleMoves.length > 0 && possibleMoves.includes(place)) {
        game.move(selectedPlace, place);    
        possibleMoves = [];
        game.aiMove();  
    } else {
        possibleMoves = game.moves(place);
        selectedPlace = place;
    }
    renderFigure();
}