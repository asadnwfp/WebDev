const columnDef = [
    { field: 'alphaNumberSystem', type: ['alphaSpan'] },
    { field: 'alphaNumberSystemValues', type: ['alphaValuesSpan'] },
    { field: 'romanNumberSystemn', type: ['romanSpan'] },
    { field: 'romanNumberSystemnValues', type: ['romanValuesSpan'] },
    { field: 'cardinalNumberSystemn', type: ['cardinalSpan'] },
    { field: 'cardinalNumberSystemValues', type: ['cardinalValuesSpan'] },
    { field: 'previousYear', type: [] },
    { field: 'previousYearTotal', type: [] },
    { field: 'currentYear', type: [] },
]


const customTypes = {
    alphaValuesSpan: {
        colSpan: 4
    },
    romanValuesSpan: {
        colSpan: 2
    }

}


const rowDef = {};

const gridOptions = {
    columnDefs: columnDef,
}



// Activa : starts with 1
// Passiva: starts with 3