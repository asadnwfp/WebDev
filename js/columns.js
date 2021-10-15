var myIcons = {
    treeOpen: function() {
        return 'open';
    },
    treeClosed: function() {
        return 'close';
    },
};

//Default Col Def
const defaultColDef = {
    editable: false,
    colSpan: params => {
        let cid = params.column.colId;
        let field = params.column.userProvidedColDef.field;
        let indent = params.data.indent;
        let typeIndent = params.data.typeIndent;

        switch (cid) {
            case '0':
            case '1':
            case '2':
                params.column.actualWidth = 50;
                params.column.minWidth = 45;
                return 0;

            case '6':
            case '7':
            case '8':
                params.column.actualWidth = 130;
                params.column.minWidth = 100;
                return 0;
        }

        switch (typeIndent) {
            case 'alpha':
                switch (field) {
                    case 'indent':
                    case 'tree':
                    case 'num':
                        params.column.actualWidth = 50;
                        params.column.minWidth = 45;
                        return 0;
                    case 'name':
                        return indent;
                }
            case 'roman':
                switch (field) {
                    case 'num':
                    case 'name':
                        params.column.actualWidth = 50;
                        params.column.minWidth = 45;
                        return 0;
                    case 'i2':
                        return indent;
                }
            case 'cardinal':
                switch (field) {
                    case 'name':
                    case 'i2':
                        params.column.actualWidth = 50;
                        params.column.minWidth = 45;
                        return 0;
                    case 'i3':
                        params.column.actualWidth = 450;
                        params.column.minWidth = 200;
                        return indent;
                }
        }

    },


    cellClassRules: {
        'bold-text': params => {

            colId = params.colDef.colId;
            indent = params.data.indent;
            switch (indent) {
                case 3:
                    return true;

                    // case 1:
                    //     return true;
                case 2:
                    if (colId == 7) {
                        return true;
                    }

            };
        },
        'content': params => {
            let colId = params.colDef.colId;
            let field = params.colDef.field;
            let type = params.data.typeIndent;
            switch (type) {
                case 'alpha':
                case 'roman':
                    if (colId == 4)
                        return true;
                case 'cardinal':
                    if (colId == 5)
                        return true;
                    break;
            }
        },
        'underline': params => {
            let field = params.colDef.field;
            let style = params.data.style;
            let singleElement = params.data.singleElement;

            if ((field == 'py' || field == 'cy') && singleElement) {
                return true;
            }

            if (style == 'dashed') {
                if ((field == 'balance' || field == 'cy' || field == 'py') && params.value != '' && params.value != undefined)
                    return true;
            }
            return false;

        },
        'underline-dotted': params => {
            let field = params.colDef.field;
            let style = params.data.style;

            if (style == 'dotted') {
                if ((field == 'balance' || field == 'cy'))
                    return true;
            }
            return false;
        },
        'underline-double': params => {
            let field = params.colDef.field;
            let lastChild = params.node.lastChild;
            if (lastChild && (field == 'balance' || field == 'cy')) {
                return true;
            }
        },
        "rightAlighValues": params => {
            let field = params.colDef.field;
            switch (field) {
                case 'py':
                case 'cy':
                case 'balance':

                    return true;
                default:
                    return false;
            }
        },
    }
};



// let the grid know which columns and what data to use
const columnDefs = [{
        field: "indent",
        colId: "0",
        cellRenderer: 'totalValueRenderer',
        cellRendererParams: {
            treeOpen: 'tree-open.svg', // Complementing the Cell Renderer parameters
            treeClose: 'tree-close.svg', // Complementing the Cell Renderer parameters
        },
    },
    // { field: "numActiva", colId: "1" , colSpan: params => params.columnApi.getColumn("indent"). },
    { cellRenderer: 'treeCellRenderer', field: "tree", colId: "1", },
    { field: "num", colId: "2", },
    {
        field: "name",
        colId: "3",
        wrapText: true,
        autoHeight: true,
    },
    {
        field: "i2",
        colId: "4",
        wrapText: true,
        autoHeight: true,
    },
    {
        field: "i3",
        colId: "5",
        wrapText: true,
        autoHeight: true,
    },
    { field: "py", colId: "6", type: 'custColumnTypes', },
    { field: "balance", colId: "7", type: 'custColumnTypes', },
    { field: "cy", colId: "8", type: 'custColumnTypes', },

];