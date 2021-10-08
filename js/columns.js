//Default Col Def
const defaultColDef = {
    width: 150,
    editable: false,
};

// CustomColumnTypes
const custColumnTypes = {
    editableColumn: { editable: true }
};

// let the grid know which columns and what data to use
const columnDefs = [
    { field: "indent", colId: "0", width: 80 },
    // { field: "numActiva", colId: "1" , colSpan: params => params.columnApi.getColumn("indent"). },
    { field: "num", colId: "1", width: 100 },
    // { field: "name", colId: "2", width: 300, colSpan: params => params.data.indent },
    { field: "name", colId: "2", width: 100 },
    { field: "i2", colId: "3", width: 100 },
    { field: "i3", colId: "4", width: 200 },
    { field: "i3name", colId: "5" },
    { field: "py", colId: "py" },
    { field: "balance", colId: "balance" },
    { field: "cy", colId: "cy" },

];