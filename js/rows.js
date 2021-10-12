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

function createJsonObject(jsonArray) {
    let alphaArrayCount = 1;
    let romanArrayCount = 1;
    let cardinalArrayCount = 1;
    let jsonObjectMap = [];
    let caseType = '';
    jsonArray.sort(comparator).filter(jsonObject => {
            if (jsonObject.finalBalance !== 0 ||
                jsonObject.priorBalance !== 0 ||
                jsonObject.showZero == 1) {
                return 1;
            } else {
                return 0;
            }
        }).forEach(jsonObject => {
            switch (jsonObject.number.toString().split('.').length) {
                // Show Zero : 0
                // Previous Balance: 0
                // Final Balce : 0
                case 1:
                    // AKTIVA
                    listCounter = "";
                    switchColumn = 0;
                    break;
                case 2:
                    // AlphaNumeric Groups

                    caseType = 'alpha';
                    listCounter = String.fromCharCode(parseInt(alphaArrayCount++) + 64);
                    // lastGroupRowBalances = { listIndent: listIndent, balance: sumPy_i0, cy: sumCy_i0 };
                    if (romanArrayCount > 1) {
                        addDashStyle(jsonObjectMap)
                            // activaMap.push(lastGroupRowBalances)
                        romanArrayCount = 1;
                        cardinalArrayCount = 1;
                    }
                    break;
                case 3:
                    // Roman Groups
                    caseType = 'roman';
                    listIndent = 2;
                    listCounter = toRoman(parseInt(romanArrayCount++));

                    if (cardinalArrayCount > 1) {
                        addDashStyle(jsonObjectMap)
                            // activaMap.push({ listIndent: listIndent, balance: sumPy_i1, cy: sumCy_i1 })
                        cardinalArrayCount = 1;
                    }
                    break;
                case 4:
                    // cardinalGroups
                    caseType = 'cardinal';
                    listCounter = cardinalArrayCount++;
                    break;
                case 5:
                    listIndent = 4;
                    listCounter = "--";
                    break;
                default:
                    listCounter = parseInt(split[3]);
                    listCounter = parseInt(split[split.length - 1]);;
            }





            let alpha = {};
            let roman = {};
            let cardinal = {};
            switch (caseType) {
                case 'alpha':
                    alpha = {
                        num: listCounter,
                        name: jsonObject.name,
                        py: jsonObject.priorBalance,
                        cy: jsonObject.finalBalance,
                        listIndent: false,
                        groups: []
                    }
                    jsonObjectMap.push(alpha);

                    break;
                case 'roman':
                    roman = {
                        num: listCounter,
                        name: jsonObject.name,
                        py: jsonObject.priorBalance,
                        cy: jsonObject.finalBalance,
                        listIndent: false,
                        groups: []
                    }
                    mapObj = jsonObjectMap[alphaArrayCount - 2];
                    mapObj.listIndent = true;
                    mapObj.groups.push(roman);
                    break;
                case 'cardinal':
                    cardinal = {
                        num: listCounter,
                        name: jsonObject.name,
                        py: jsonObject.priorBalance,
                        cy: jsonObject.finalBalance,
                        listIndent: false,
                        groups: []
                    }
                    mapObj = jsonObjectMap[alphaArrayCount - 2].groups[romanArrayCount - 2];
                    mapObj.listIndent = true;
                    mapObj.groups.push(cardinal);
                    break;
            }

        })
        // consoleLog("createActivaMap()", JSON.stringify(jsonObjectMap));
    return jsonObjectMap;
}

function createRowDataFromJsonObject() {
    let jsonArray = createJsonObject(activas);
}

function createRowDataActiva() {
    createJsonObject(activas);

    let alphaArrayCount = 1;
    let romanArrayCount = 1;
    let cardinalArrayCount = 1;
    let treeMap = [];
    let tree = {
        key: '',
        alpha: '',
        listRowIndex: [],
    }

    // For Summation of Previous and Current Year balance

    // Indent 0
    let sumCy_i0 = '';
    let sumPy_i0 = '';

    // Indent 1
    let sumCy_i1 = '';
    let sumPy_i1 = '';
    let lastGroupRowBalances = {};

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
                // AlphaNumeric Groups


                listIndent = 1;
                listCounter = String.fromCharCode(parseInt(alphaArrayCount++) + 64);
                tree.key = listCounter; // Using ListCounter as Key for the tree
                lastGroupRowBalances = { listIndent: listIndent, balance: sumPy_i0, cy: sumCy_i0 };
                if (romanArrayCount > 1) {
                    addDashStyle(rowData)
                        // if (checkGroupWithOutSubGroup(romanArrayCount, cardinalArrayCount)) {
                        //     let lastMem = rowData.pop();
                        //     lastGroupRowBalances.indent = lastMem.indent;
                        //     lastGroupRowBalances.listIndent = lastMem.listIndent;
                        //     lastGroupRowBalances.num = lastMem.num;
                        //     lastGroupRowBalances.name = lastMem.name;
                        //     lastGroupRowBalances.i2 = "lastMem.i2"
                        //     lastGroupRowBalances.i3 = lastMem.i3
                        // }

                    rowData.push(lastGroupRowBalances)
                    romanArrayCount = 1;
                    cardinalArrayCount = 1;
                }
                switchColumn = 1;
                break;
            case 3:
                // Roman Groups
                listIndent = 2;
                listCounter = toRoman(parseInt(romanArrayCount++));

                if (cardinalArrayCount > 1) {
                    addDashStyle(rowData)
                    rowData.push({ listIndent: listIndent, balance: sumPy_i1, cy: sumCy_i1 })
                    cardinalArrayCount = 1;
                }


                switchColumn = 2;
                break;
            case 4:
                // cardinalGroups
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
                row.num = "";
                row.name = listCounter;
                row.i2 = name;
                row.indent = 1;

                row.py = '';
                row.cy = '';

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
    Object.entries(lastGroupRowBalances).forEach(entry => {
        const [key, value] = entry;
        r[key] = value;
    })
    r.lastRow = true;
    rowData.push(r)
}

function checkGroupWithOutSubGroup(romanArrayCount, cardinalArrayCount) {
    // Check wether the row belongs to a group, without any subgroup
    if (romanArrayCount > 1 && cardinalArrayCount == 1) {
        return true;
    }
    return false;
}

function addDashStyle(row) {
    let len = row.length;
    let secondLastRow = row.pop();
    secondLastRow.addDashStyle = true;
    row.push(secondLastRow);
}



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