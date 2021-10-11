let rowData = [];
const rowMapActiva = new Map();
const rowMapPassiva = new Map();

const toRoman = (num, i = "I", v = "V", x = "X", l = "L", c = "C", d = "D", m = "M") =>
    num ? toRoman(num / 10 | 0, x, l, c, d, m, "?", "?", num %= 10) +
    (i + ["", v, x][++num / 5 | 0] + i.repeat(num % 5)).replace(/^(.)(.*)\1/, "$2") :
    "";

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
    createRowDataActiva();
    // createRowdataPassiva();
    setupGrid(rowData);
}

let aktiva = {
    indent: 5,
    num: "AKTIVA",
    py: "someDate",
    cy: "someDate",
    listIndent: 0
}

function comparator(a, b) {
    var numA = a.number;
    var numB = b.number;
    if (numA < numB) {
        return -1;
    }
    if (numA > numB) {
        return 1;
    }
    return 0;
}

function createRowDataActiva() {
    alphaArrayCount = 1;
    romanArrayCount = 1;
    cardinalArrayCount = 1;


    // For Summation of Previous and Current Year balance

    // Indent 0
    let sumCy_i0 = '';
    let sumPy_i0 = '';

    // Indent 1
    let sumCy_i1 = '';
    let sumPy_i1 = '';
    let lastRow = {};

    activas.sort(comparator).filter(activa => {
        if (activa.finalBalance !== 0 ||
            activa.priorBalance !== 0 ||
            activa.showZero == 1) {
            return 1;
        } else {
            return 0;
        }
    }).forEach(activa => {

        let finalBalance = activa.finalBalance;
        let name = activa.name;
        let number = activa.number;
        let priorBalance = activa.priorBalance;
        let indent = 0;

        let split = number.split('.');
        let listCounter = false; // represent the ListNumbering of items 
        let listIndent = undefined; // indent for columns of List Numbering Alpha:1, Roman:2, Cadinal:3, --:4

        let switchColumn = ""; // used for switch case, to see which dataItem fits in the table.
        switch (split.length) {
            // Show Zero : 0
            // Previous Balance: 0
            // Final Balce : 0
            case 1:
                // AKTIVA
                listCounter = "";
                switchColumn = 0;
                break;
            case 2:
                listIndent = 1;
                listCounter = String.fromCharCode(parseInt(alphaArrayCount++) + 64);
                lastRow = { listIndent: listIndent, balance: sumPy_i0, cy: sumCy_i0 };
                if (romanArrayCount > 1) {
                    rowData.push(lastRow)
                    romanArrayCount = 1;
                    cardinalArrayCount = 1;
                }
                switchColumn = 1;
                break;
            case 3:
                listIndent = 2;
                listCounter = toRoman(parseInt(romanArrayCount++));
                if (cardinalArrayCount > 1) {
                    rowData.push({ listIndent: listIndent, balance: sumPy_i1, cy: sumCy_i1 })
                    cardinalArrayCount = 1;
                }
                switchColumn = 2;
                break;
            case 4:
                listIndent = 3;
                listCounter = cardinalArrayCount++;
                switchColumn = 3;
                break;
            case 5:
                listIndent = 4;
                listCounter = "--";
                switchColumn = 4;
                break;
            default:
                listCounter = parseInt(split[3]);
                listCounter = parseInt(split[split.length - 1]);;
                // indent = 3;

        }



        let row = {
            name: name,
            num: listCounter,
            py: priorBalance,
            cy: finalBalance,
            indent: indent,
            listIndent: listIndent,
            switchColumn: switchColumn,
        }

        // Chcecking for Listcounter if its empty , so we should not indent it.
        // if (listCounter !== '') {
        //     row.listIndent = true;
        //     row.listIndent = listIndent;
        // }

        if (rowData.length == 0) {
            // This is just to add Aktiva
            rowData.push(aktiva);
            rowData.push({ listIndent: 0, indent: 5, cy: 'EUR', py: 'EUR' });
            return;
        }

        // For the rest of the rows we use Switch Cases
        switch (row.switchColumn) {
            case 1:
                // row = {
                //     name: name,
                //     num: listCounter,
                //     indent: 0,
                // }
                row.name = name;
                row.num = listCounter;
                row.indent = 0;
                row.py = '';
                row.cy = '';

                sumPy_i0 = priorBalance;
                sumCy_i0 = finalBalance;
                consoleLog("createRowDataActiva(): sumPy_Added : ", sumPy_i0)
                consoleLog("createRowDataActiva(): sumCy_Added : ", sumCy_i0)
                break;
            case 2:
                row.num = ""
                row.name = listCounter;
                row.i2 = name;
                row.indent = 1;

                sumPy_i1 = priorBalance
                sumCy_i1 = finalBalance
                break;
            case 3:

                row.num = ""
                row.name = "";
                row.i2 = listCounter;
                row.i3 = name;
                row.py = priorBalance;
                row.cy = finalBalance;
                row.indent = 2;

                break;
            default:

        }

        // consoleLog("createRowdataActiva() : row ", row.name);
        rowData.push(row);
        // consoleLog('createRowdataActiva()', JSON.stringify(row))
    });
    let r = rowData.pop();
    Object.entries(lastRow).forEach(entry => {
        const [key, value] = entry;
        r[key] = value;
    })
    rowData.push(r)
}

// function createRowdataActiva() {
//     rowMapActiva.forEach((name, num) => {
//         let split = num.toString().split('.');
//         let listCounter = "";
//         let indent = "";
//         switch (split.length) {
//             // Show Zero : 0
//             // Previous Balance: 0
//             // Final Balce : 0
//             case 1:
//                 listCounter = "";
//                 indent = 0;
//                 break;
//             case 2:
//                 listCounter = String.fromCharCode(parseInt(split[1]) + 64);
//                 indent = 1;
//                 break;
//             case 3:
//                 let spl = split[2] / 100
//                 listCounter = toRoman(parseInt(spl));
//                 indent = 2;
//                 break;
//             case 4:
//                 listCounter = "-";
//                 indent = 3;
//                 break;
//             default:
//                 listCounter = parseInt(split[3]);
//                 listCounter = parseInt(split[split.length - 1]);;
//                 indent = 3;

//         }

//         let row = {
//             indent: indent,
//             name: name,
//             num: listCounter
//         }

//         //     consoleLog("createRowdataActiva() : rowType ", typeof row.name);
//         //     consoleLog("createRowdataActiva() : rowName ", row.name);

//         consoleLog("createRowdataActiva() : row ", row.name);

//         switch (row.indent) {
//             case 0:
//                 row = aktiva;
//                 break;
//             case 1:
//                 row = {
//                     indent: 1,
//                     name: name,
//                     num: listCounter
//                 }
//                 break;
//             case 2:
//                 row = {
//                     indent: 2,
//                     name: listCounter,
//                     i2: name
//                 }
//                 break;
//             case 3:
//                 row = {
//                     indent: 2,
//                     i2: listCounter,
//                     i3: name
//                 }
//                 break;
//             default:

//         }

//         // consoleLog("createRowdataActiva() : row ", row.name);
//         rowData.push(row);
//         // consoleLog('createRowdataActiva()', JSON.stringify(row))
//     })

//     // consoleLog('createRowdataActiva()', JSON.stringify(rowData))

// }

function createRowdataPassiva() {
    rowMapPassiva.forEach((name, num) => {
        let split = num.toString().split('.');
        let listCounter = "";
        let indent = "";
        switch (split.length) {
            case 1:
                listCounter = String.fromCharCode(parseInt(split[0]) + 64);
                indent = 1;
                break;
            case 2:
                listCounter = toRoman(parseInt(split[1]));
                indent = 2;
                break;
            case 3:
                listCounter = parseInt(split[2]);
                indent = 3;
                break;
            default:
                listCounter = parseInt(split[split.length - 1]);;
                indent = 4;

        }

        var row = {
            nameP: name,
            numPaciva: listCounter
        }
        rowData.push(row);
        consoleLog('createRowdataPassiva()', JSON.stringify(row))
    })

    // consoleLog('createRowdataPassiva()', JSON.stringify(rowData))

}