const fs = require('fs');

// Upto 3999
// There is no Zero
const toRoman = (num, i = "I", v = "V", x = "X", l = "L", c = "C", d = "D", m = "M") =>
    num ? toRoman(num / 10 | 0, x, l, c, d, m, "?", "?", num %= 10) +
    (i + ["", v, x][++num / 5 | 0] + i.repeat(num % 5)).replace(/^(.)(.*)\1/, "$2") :
    "";

// console.log(toRoman(1));

function callback_readSheet() {
    consoleLog("Function-callback_readSheet");
    fs.readFile('./sheet.json', 'utf8', (err, balanceSheetTags) => {
        if (err) {
            console.log("File read failed:", err)
            return;
        }
        consoleLog('File data:', balanceSheetTags);
        try {
            const tags = JSON.parse(balanceSheetTags);
            const balanceSheet = [];
            tags.forEach(tag => {
                let numSys = tag.number.split('.');
                let num = parseInt(numSys[0]);
                if (num === 1 || num === 3) {
                    balanceSheet.push(tag);
                }
            });
            console.log(JSON.stringify(balanceSheet));
        } catch (err) {
            console.log('Error Parsing JSON Strings: ', err);
        }
    })

    consoleLog("Function-callback_readSheet-finished");

}



function callback_balanaceSheet() {
    let activa = [];
    let passiva = [];
    fs.readFileSync('./balanceSheet.json', 'utf-8', (err, balanceSheet) => {
        if (err) {
            console.log("File read Failed: ", err);
            return;
        }

        try {
            const tags = JSON.parse(balanceSheet);
            consoleLog("Tag length: " + tags.length)
            tags.forEach(tag => {
                // consoleLog("Tag: " + JSON.stringify(tag));
                // consoleLog("tag.name: " + tag.name)
                // consoleLog("tag.number: " + tag.number + " Type: " + typeof tag.number)
                let numSys = tag.number.toString().split('.');
                let num = parseInt(numSys[0]);
                if (num === 1) {
                    activa.push(tag);
                }
                if (num === 3) {
                    passiva.push(tag);
                }
            });
        } catch (err) {
            console.log('Json Read err: ', err)
        }


    })

    return [activa, passiva];
}

function readBalanaceSheetSync() {
    let activa = [];
    let passiva = [];
    let balanceSheet = fs.readFileSync('./balanceSheet.json', 'utf-8');
    try {
        const tags = JSON.parse(balanceSheet);
        consoleLog("Tag length: " + tags.length)
        tags.forEach(tag => {
            // consoleLog("Tag: " + JSON.stringify(tag));
            // consoleLog("tag.name: " + tag.name)
            // consoleLog("tag.number: " + tag.number + " Type: " + typeof tag.number)
            let numSys = tag.number.toString().split('.');
            let num = parseInt(numSys[0]);
            if (num === 1) {
                activa.push(tag);
            }
            if (num === 3) {
                passiva.push(tag);
            }
        });
    } catch (err) {
        console.log('Json Read err: ', err)
    }

    return [activa, passiva];
}

function writeFile(fileName, data) {
    if (makefile) {
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                consoleLog(fileName + " has been written.");
                consoleLog(fs.readFileSync(fileName, "utf8"));
            }
        })
    }

}




debug = true;
makefile = false;
consoleLog("StartingConsole");
// callback_readSheet();
const sheet = readBalanaceSheetSync();
consoleLog("BalanceSheet Elements: " + sheet.length);

writeFile("activa.json", JSON.stringify(sheet[0]));
writeFile("passiva.json", JSON.stringify(sheet[1]));

function consoleLog(message) {
    if (debug) {
        console.log(message);
    }
}





// export { callback_balanaceSheet as balanceSheet };