const rowData = [
    { make: "Toyota", model: "Celica", price: 35000, b_make: "Hello", b_model: "Celica", b_price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000, b_make: "Ford", b_model: "Mondeo", b_price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000, b_make: "Porsche", b_model: "Boxter", b_price: 72000 },
    { b_make: "Hello", b_model: "Celica", b_price: 35000 },
    { b_make: "Ford", b_model: "Mondeo", b_price: 32000 },
    { b_make: "Porsche", b_model: "Boxter", b_price: "hell" }
];





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







function hideBMake() {
    consoleLog('hideBMake', "Hiding BMake");
    window.b_make = gridOptions.columnApi.getColumn('make');
    consoleLog('hideBMake', { b_make })
    gridOptions.columnApi.setColumnVisible(b_make, false);


}

function showBMake() {
    gridOptions.columnApi.setColumnVisible(b_make, true);
    consoleLog('showBMake', b_make);
}





// const helloWOrld = document.getElementById('helloWorld')

// const hideBMakeElement = document.getElementById("hideBMake");
// const showBMakeElement = document.getElementById("showBMake");


function helloWorld() {
    consoleLog('helloWorld()', " Hello World Console")
}



function consoleLog(methodName, message) {
    const debug = true;
    if (debug) {
        console.log(methodName + " : " + message);
    }
}
//###################################################################
//############### Ag-gRID ################################
//###################################################################

//Default Col Def
const defaultColDef = {
    width: 150,
    editable: false,
};

// CustomColumnTypes
const custColumnTypes = {
    editableColumn: { editable: true }
};

const columnDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "b_make" },
    { field: "b_model" },
    { field: "b_price" }

];

//setup the grid after the page has finished loading
const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    headerHeight: 70,
    defaultColDef: defaultColDef,
    columnTypes: custColumnTypes,
    debug: true,

};
// let column_make = gridOptions.columnApi.getAllColumns();
// consoleLog('ConsoleMessage SetupGrid()', column_make);



document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});