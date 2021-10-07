const map = new Map();
map.set('greeting', 'Hello');
map.set('name', 'John');

map.forEach((value, key) => {
    // Prints "greeting Hello" followed by "name John"
    console.log(value, key);
});