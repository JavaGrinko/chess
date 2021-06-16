window.onload = () => {
    let table = document.getElementById('game-field');
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 8; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}