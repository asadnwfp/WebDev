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
    { field: "name", width: 300 },
    { field: "number" }
    // { field: "price" }

];