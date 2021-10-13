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

        if (cid == '0' || cid == '1_1' || cid == '1') {
            params.column.actualWidth = 60;
            params.column.minWidth = 45;
            return 0;
        } else {
            switch (typeIndent) {
                case 'alpha':
                    switch (field) {
                        case 'indent':
                        case 'tree':
                        case 'num':
                            params.column.actualWidth = 60;
                            params.column.minWidth = 45;
                            break;
                        case 'name':
                            return indent;
                    }
                case 'roman':
                    switch (field) {
                        case 'indent':
                        case 'tree':
                        case 'num':
                        case 'name':
                            params.column.actualWidth = 60;
                            params.column.minWidth = 45;
                            break;
                        case 'i2':
                            return indent;
                    }
                case 'cardinal':
                    switch (field) {
                        case 'indent':
                        case 'tree':
                        case 'num':
                        case 'name':
                        case 'i2':
                            params.column.actualWidth = 60;
                            params.column.minWidth = 45;
                            break;
                        case 'i3':
                            params.column.actualWidth = 350;
                            params.column.minWidth = 100;
                            return indent;
                    }
            }
        }

        let x = 123;

    },

    // colSpan: params => 
    // {
    // let cid = params.column.colId;
    // let field = params.column.userProvidedColDef.field;
    // let listIndent = params.data.listIndent;

    // if (cid == '0' || listIndent == cid) {
    //     params.column.actualWidth = 60;
    //     params.column.minWidth = 45;
    //     return 0;
    // } else if (parseInt(cid) == listIndent + 1) {
    //     switch (listIndent) {
    //         case 0:

    //             return 4;
    //         case 1:
    //             return 3;
    //         case 2:
    //             return 2;
    //         case 3:
    //             return 1;
    //         default:
    //             return 1;

    //     }
    // } else if (field == 'py' && listIndent == 0) {
    //     // for EUR and Date CellSpan
    //     return 2;
    // }

    // // DefaultCase for all
    // return 0;

    // },
    // cellClassRules: {
    //     'bold-text': params => {

    //         colId = params.colDef.colId;
    //         indent = params.data.indent;
    //         switch (indent) {
    //             case 0:
    //                 return true;

    //             case 1:
    //                 return true;
    //             case 2:
    //                 if (colId == 7) {
    //                     return true;
    //                 }

    //         };
    //     },
    //     'content': params => {
    //         colId = params.colDef.colId;
    //         field = params.colDef.field;
    //         indent = params.data.indent;
    //         if (field == 'py') {
    //             return false;
    //         }
    //         switch (indent) {
    //             case 2:
    //                 if (colId == 3) {
    //                     return true;
    //                 }
    //                 break;

    //             case 3:
    //                 if (colId == 4) {
    //                     return true;
    //                 }
    //                 break;

    //         };
    //     },
    //     'underline': params => {
    //         let colId = params.colDef.colId;
    //         let field = params.colDef.field;
    //         let data = params.value;
    //         let indent = params.data.indent;
    //         let dashedStyle = params.data.addDashStyle;

    //         if (indent == 2 && (field == 'balance' || field == 'cy') && data != undefined) {
    //             if (params.data.cy == "") {
    //                 return false;
    //             }
    //             return true;
    //         }

    //         if (dashedStyle && (field == 'cy' || field == 'py') && data != "") {
    //             return true;
    //         }

    //         if (indent == 1 || indent == 2) {
    //             return false;
    //         }
    //         // let x = 23;
    //         // switch (field) {
    //         //     case 'py':
    //         //         return true;
    //         //     case 'cy':
    //         //         return true;
    //         //     case 'balance':
    //         //         if (data == undefined) {
    //         //             return false;
    //         //         }
    //         //         return true;

    //         // }

    //     },
    //     'underline-dotted': params => {
    //         let field = params.colDef.field;
    //         let data = params.value;
    //         let indent = params.data.indent;
    //         if (indent == 1 && (field == 'balance' || field == 'cy') && data != undefined) {
    //             if (params.data.cy == "") {
    //                 return false;
    //             }
    //             return true;
    //         }
    //     },
    //     'underline-double': params => {
    //         let field = params.colDef.field;
    //         let lastChild = params.node.lastChild;
    //         if (lastChild && (field == 'balance' || field == 'cy')) {
    //             return true;
    //         }
    //     },
    // }
};



// let the grid know which columns and what data to use
const columnDefs = [
    { field: "indent", colId: "0", width: 80 },
    // { field: "numActiva", colId: "1" , colSpan: params => params.columnApi.getColumn("indent"). },
    { cellRenderer: treeCellRenderer, field: "tree", colId: "1", width: 100 },
    { field: "num", colId: "1", },
    { field: "name", colId: "2" },
    {
        field: "i2",
        colId: "3",
        wrapText: true,
        autoHeight: true,
    },
    {
        field: "i3",
        colId: "4",
        wrapText: true,
        autoHeight: true,
    },
    { field: "py", colId: "4", type: 'custColumnTypes', },
    { field: "balance", colId: "5", type: 'custColumnTypes', },
    { field: "cy", colId: "6", type: 'custColumnTypes', },

];

// Creating Tree Collapse and Uncollapse Arrows.
function treeCellRenderer(params) {
    var treeClosed =
        '<img border="0" width="50" height="30" class="tree-arrow" src="../assets/images/tree-closed.svg">';
    var treeOpen =
        '<img border="0" width="50" height="30"  src="../assets/images/tree-open.svg">';
    return (
        '<span style="cursor: default;">' + treeClosed + ' </span>'
    );
}