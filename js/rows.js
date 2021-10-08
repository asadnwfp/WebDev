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
    cy: "someDate"
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


        let split = activa.number.split('.');
        let listCounter = "";
        let indent = "";
        switch (split.length) {
            // Show Zero : 0
            // Previous Balance: 0
            // Final Balce : 0
            case 1:
                listCounter = "";
                indent = 0;
                break;
            case 2:
                listCounter = String.fromCharCode(parseInt(alphaArrayCount++) + 64);
                if (romanArrayCount > 1) {
                    rowData.push({ balance: sumPy_i0, cy: sumCy_i0 })
                    romanArrayCount = 1;
                    cardinalArrayCount = 1;
                }
                indent = 1;
                break;
            case 3:
                listCounter = toRoman(parseInt(romanArrayCount++));
                if (cardinalArrayCount > 1) {
                    rowData.push({ balance: sumPy_i1, cy: sumCy_i1 })
                    cardinalArrayCount = 1;
                }
                indent = 2;
                break;
            case 4:
                listCounter = cardinalArrayCount++;
                indent = 3;
                break;
            case 5:
                listCounter = "--";
                indent = 4;
                break;
            default:
                listCounter = parseInt(split[3]);
                listCounter = parseInt(split[split.length - 1]);;
                indent = 3;

        }

        let row = {
            indent: indent,
            name: name,
            num: listCounter,
            py: priorBalance,
            cy: finalBalance,
        }

        if (rowData.length == 0) {
            rowData.push(aktiva);
            rowData.push({ cy: 'EUR', py: 'EUR' });
            return;
        }
        switch (row.indent) {
            // case 0:
            //     row = aktiva;
            //     break;
            case 1:
                row = {
                    indent: 1,
                    name: name,
                    num: listCounter,
                };
                sumCy_i0 = priorBalance;
                sumPy_i0 = finalBalance;
                consoleLog("createRowDataActiva(): sumPy_Added : ", sumPy_i0)
                consoleLog("createRowDataActiva(): sumCy_Added : ", sumCy_i0)
                break;
            case 2:
                row = {
                    indent: 2,
                    name: listCounter,
                    i2: name,
                }
                sumCy_i1 = priorBalance
                sumPy_i1 = finalBalance
                break;
            case 3:
                row = {
                    indent: 2,
                    i2: listCounter,
                    i3: name,
                    py: priorBalance,
                    cy: finalBalance,
                }
                break;
            default:

        }

        // consoleLog("createRowdataActiva() : row ", row.name);
        rowData.push(row);
        // consoleLog('createRowdataActiva()', JSON.stringify(row))
    })
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