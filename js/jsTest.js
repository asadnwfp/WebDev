function testForeach(item) {
    ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function(colId) {
        // skip 50% of the cells so updates are random
        if (Math.random() > 0.5) {
            return;
        }
        mr = Math.random()
        mr100 = mr * 100
        mrf = Math.floor(mr100);
        item[colId] = mrf;
        console.log('mr: ', mr);
        console.log('mr100: ', mr100);
        console.log('mrf: ', mrf);
        console.log('###########');
    });
}


function createData(count) {
    var result = [];
    for (var i = 1; i <= count; i++) {
        result.push({
            a: (i * 863) % 100,
            b: (i * 811) % 100,
            c: (i * 743) % 100,
            d: (i * 677) % 100,
            e: (i * 619) % 100,
            f: (i * 571) % 100,
        });
    }
    return result;
}


testForeach(createData(2))