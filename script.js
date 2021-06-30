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
}

/*
 Белые:
 1 - пешка
 2 - конь
 3 - слон
 4 - ладья
 5 - ферзь
 6 - король
 Черные:
 11 - пешка
 12 - конь
 13 - слон
 14 - ладья
 15 - ферзь
 16 - король
 */

let field = [
    [14, 12, 13, 15, 16, 13, 12, 14],
    [11, 11, 11, 11, 11, 11, 11, 11],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [4, 2, 3, 5, 6, 3, 2, 4],
];

function renderFigure() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            switch (field[row][column]) {
                case 1:
                    putFigure(row, column, 'white-pawn');
                    break;
                case 2: 
                    putFigure(row, column, 'white-horse');
                    break;
                //  дописать кейсы для 
            }
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

let lastFigure;

function clickFigure(row, column) {
    if (!lastFigure) {
        if (!isEmpty(row, column)) {
            lastFigure = { row, column };
        }
    } else {
        if (isEmpty(row, column)) {
            field[row][column] = field[lastFigure.row][lastFigure.column];
            lastFigure = undefined;
        }
    }
}

function isEmpty(row, column) {
    return field[row][column] === 0;
}
