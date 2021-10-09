async function fetchBalanceSheet() {
    await fetch("./json/balanceSheet.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            appendData(data);
        })
        .catch(function(err) {
            console.log(err);
        });

    createRowMap();
}

function appendData(data) {
    // consoleLog('appendData', JSON.stringify(data));
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


fetchBalanceSheet();

var balanceSheet = [];
var activas = [];
var passivas = [];

consoleLog('balanceSheet', balanceSheet);
consoleLog('activas.length', activas.length);
consoleLog('passivas.length', passivas.length);


//###################################################################
//############### Ag-gRID ################################
//###################################################################



//setup the grid after the page has finished loading
let gridOptions = {}

function setupGrid(rowData) {

    gridOptions = {
        rowStyle: { background: 'black', color: '#fff' },
        columnDefs: columnDefs,
        rowData: rowData,
        headerHeight: 70,
        defaultColDef: defaultColDef,
        columnTypes: custColumnTypes,
        debug: false,

    };

    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    allColumns = gridOptions.columnApi.getAllColumns()
    nameColumn = gridOptions.columnApi.getColumn('name')
    colState = gridOptions.columnApi.getColumnState();
    consoleLog('ConsoleMessage SetupGrid()', colState);
    consoleLog('ConsoleMessage SetupGrid()', allColumns);
    consoleLog('ConsoleMessage SetupGrid()', nameColumn);
    gridOptions.columnApi.moveColumn(nameColumn, 1);

}