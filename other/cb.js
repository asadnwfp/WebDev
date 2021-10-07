function funcOne(_cb) {
    console.log("FuncOne: Start");
    _cb();
    console.log("FuncOne: end");
}

function funcTwo() {
    console.log("FuncTwo: Start");
    funcOne(() => {
        console.log("FuncOne: Cb Running");
    })
    console.log("FuncTwo: End");
}

funcTwo();