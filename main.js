async function fetchBalanceSheet() {
    await fetch("./balanceSheet.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            appendData(data);
            consoleLog('thenBlock: activas.length', activas.length);
            consoleLog('thenBlock: passivas.length', passivas.length);
        })
        .catch(function(err) {
            console.log(err);
        });
    consoleLog('fetchBalanceSheet(): activas.length', activas.length);
    consoleLog('fetchBalanceSheet(): passivas.length', passivas.length);

    createRowMap();
}

fetchBalanceSheet();

var balanceSheet = [];
var activas = [];
var passivas = [];

const columnDefs = [{
        headerName: 'Group A',
        children: [
            { field: "make" },
            { field: "model" },
            { field: "price" }
        ]
    },
    {
        headerName: 'Group B',
        children: [
            { field: "b_make", type: 'editableColumn' },
            { field: "b_model" },
            { field: "b_price", type: ['rightAligned', 'numericColumn'] }
        ]
    },


];



function appendData(data) {
    consoleLog('appendData', JSON.stringify(data));
    balanceSheet = JSON.stringify(data);
    readBalanaceSheetSync(balanceSheet)
}



function readBalanaceSheetSync(balanceSheet) {
    try {
        const tags = JSON.parse(balanceSheet);
        consoleLog('readBalanaceSheetSync()', "Tag length: " + tags.length)
        tags.forEach(tag => {
            // consoleLog("Tag: " + JSON.stringify(tag));
            // consoleLog("tag.name: " + tag.name)
            // consoleLog("tag.number: " + tag.number + " Type: " + typeof tag.number)
            let numSys = tag.number.toString().split('.');
            let num = parseInt(numSys[0]);
            if (num === 1) {
                activas.push(tag);
            }
            if (num === 3) {
                passivas.push(tag);
            }
        });
    } catch (err) {
        console.log('Json Read err: ', err)
    }

    consoleLog('readBalanaceSheetSync(): activas.length', activas.length);
    consoleLog('readBalanaceSheetSync(): passivas.length', passivas.length);

    return [activas, passivas];
}

//Default Col Def
const defaultColDef = {
    width: 100,
    editable: false,
};

// CustomColumnTypes
const custColumnTypes = {
    editableColumn: { editable: true }
};


consoleLog('balanceSheet', balanceSheet);
consoleLog('activas.length', activas.length);
consoleLog('passivas.length', passivas.length);
// // specify the data
// const rowData = [
//     { make: "Toyota", model: "Celica", price: 35000, b_make: "Hello", b_model: "Celica", b_price: 35000 },
//     { make: "Ford", model: "Mondeo", price: 32000, b_make: "Ford", b_model: "Mondeo", b_price: 32000 },
//     { make: "Porsche", model: "Boxter", price: 72000, b_make: "Porsche", b_model: "Boxter", b_price: 72000 },
//     { b_make: "Hello", b_model: "Celica", b_price: 35000 },
//     { b_make: "Ford", b_model: "Mondeo", b_price: 32000 },
//     { b_make: "Porsche", b_model: "Boxter", b_price: "hell" }
// ];

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
            make: name,
            model: num,
            price: "dummy"
        }
        rowData.push(row);
    })

    consoleLog('createRowdata()', JSON.stringify(rowData))
    setupGrid(rowData);
}


// let the grid know which columns and what data to use




function saveState() {
    window.colState = gridOptions.columnApi.getColumnState();
    colState = window.colState;
    consoleLog('saveState', 'column state saved');
    consoleLog('saveState', 'column state : ', { colState });
}

function restoreState() {
    if (!window.colState) {
        consoleLog('no columns state to restore by, you must save state first');
        return;
    }
    gridOptions.columnApi.applyColumnState({
        state: window.colState,
        applyOrder: true,
    });
    consoleLog('restoreState', 'column state restored');
}

function resetState() {
    gridOptions.columnApi.resetColumnState();
    consoleLog('resetState', 'column state reset');
}

// const hideBMakeElement = document.getElementById("hideBMak");
// hideBMakeElement.addEventListener('click', hideBMake());

// const showBMakeElement = document.getElementById("showBMak");
// showBMakeElement.addEventListener('click', showBMake());


function hideBMake() {
    consoleLog('hideBMake', "Hiding BMake");
    b_make = gridOptions.columnApi.getColumn('b_make');
    consoleLog('hideBMake', { b_make })
    gridOptions.columnApi.setColumnVisible(b_make, false);
}

function showBMake() {
    gridOptions.columnApi.setColumnVisible(b_make, true);
}

//setup the grid after the page has finished loading
function setupGrid(rowData) {

    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        headerHeight: 70,
        defaultColDef: defaultColDef,
        columnTypes: custColumnTypes,
        debug: true,

    };

    new agGrid.Grid(gridDiv, gridOptions);
}

var gridDiv = document.querySelector('#myGrid');
document.addEventListener('DOMContentLoaded', () => {
    gridDiv = document.querySelector('#myGrid');
    // gridDiv = document.querySelector('#myGrid');
    // new agGrid.Grid(gridDiv, gridOptions);


});


function consoleLog(methodName, message) {
    const debug = true;
    if (debug) {
        console.log(methodName + " : " + message);
    }
}