let rowData = []
const rowMapActiva = new Map();
const rowMapPassiva = new Map();

function createRowMap() {
    activas.forEach(activa => {
        let make = activa.name;
        let price = activa.number
        rowMapActiva.set(price, make)
            // rowData.push(make, price);
    });

    passivas.forEach(passiva => {
        let make = passiva.name;
        let price = passiva.number
        rowMapPassiva.set(price, make)
            // rowData.push(make, price);
    });

    consoleLog('createRowMap(): rowMapActiva', rowMapActiva.size);
    consoleLog('createRowMap(): rowMapPassiva', rowMapPassiva.size);
    createRowdata();
}

function createRowdata() {
    rowMapActiva.forEach((name, num) => {
        var row = {
            name: name,
            number: num
        }
        rowData.push(row);
    })

    // consoleLog('createRowdata()', JSON.stringify(rowData))
    setupGrid(rowData);
}