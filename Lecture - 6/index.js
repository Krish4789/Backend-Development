function starter(cb) {
    console.log("Starter Order");
    setTimeout(() => {
        console.log("Starter served");
        cb();
    }, 1000);
}

function maincourse(cb) {
    console.log("Main course Order");
    setTimeout(() => {
        console.log("Main course served");
        cb();
    }, 3000);
}

function sweets(cb) {
    console.log("Sweet Order");
    setTimeout(() => {
        console.log("Sweet served");
        cb();
    }, 1000);
}

function bill(cb) {
    console.log("Bill Order");
    setTimeout(() => {
        console.log("Bill served");
        cb();
    }, 20);
}

// Chaining the callbacks to maintain the correct order
// starter(() => {
//     maincourse(() => {
//         sweets(() => {
//             bill(() => {
//                 console.log("Finish");
//             });
//         });
//     });
// });

starter(()=>{
    sweets(() => {
        maincourse(() => 
        {
            bill(() => {
                console.log("Finish");
            })
        })
    })
})