const fs = require('fs');

console.log('🌍 1. Top-level code - Start');

// -------- TOP LEVEL PROMISE ----------
Promise.resolve().then(() => {
    console.log('🟢 2. Promise.then - Microtask Queue');
});

process.nextTick(() => {
    console.log('🟣 3. process.nextTick - Microtask (Before Promise)');
});

// -------- setTimeout (Macrotask) --------
setTimeout(() => {
    console.log('🔵 4. setTimeout - Timer Phase');
    
    // Nested Promise inside setTimeout
    Promise.resolve().then(() => {
        console.log('🔵 4.1 Promise inside setTimeout');
    });

    process.nextTick(() => {
        console.log('🔵 4.2 nextTick inside setTimeout');
    });

}, 0);

// -------- setImmediate (Check Phase) --------
setImmediate(() => {
    console.log('🟠 5. setImmediate - Check Phase');

    Promise.resolve().then(() => {
        console.log('🟠 5.1 Promise inside setImmediate');
    });

    process.nextTick(() => {
        console.log('🟠 5.2 nextTick inside setImmediate');
    });
});

// -------- fs.readFile (I/O Phase) --------
fs.readFile(__filename, 'utf8', (err, data) => {
    console.log('🟡 6. fs.readFile callback - I/O Phase');

    setTimeout(() => {
        console.log('🟡 6.1 setTimeout inside fs.readFile');
    }, 0);

    setImmediate(() => {
        console.log('🟡 6.2 setImmediate inside fs.readFile');
    });

    Promise.resolve().then(() => {
        console.log('🟡 6.3 Promise inside fs.readFile');
    });

    process.nextTick(() => {
        console.log('🟡 6.4 nextTick inside fs.readFile');
    });
});

// -------- Synchronous Function Call --------
function syncFunction() {
    console.log('🔴 7. Synchronous function call');
}
syncFunction();

console.log('🌍 8. Top-level code - End');
