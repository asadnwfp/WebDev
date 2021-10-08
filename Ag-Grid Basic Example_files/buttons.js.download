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
    window.b_make = gridOptions.columnApi.getColumn('name');
    consoleLog('hideBMake', { b_make })
    gridOptions.columnApi.setColumnVisible(b_make, false);


}

function showBMake() {
    gridOptions.columnApi.setColumnVisible(b_make, true);
    consoleLog('showBMake', b_make);
}




function helloWorld() {
    consoleLog('helloWorld()', " Hello World Console")
}