let products = [
    { id: 1, name: "Iphone 16", price: 10000 },
    { id: 2, name: "Samsung S24", price: 12000 }
];

let bankBalance = 15000; 

function buyProduct(productName) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.name == productName);
        if (product) {
            resolve(product.price);
        } else {
            reject("No product found");
        }
    });
}

function pay(amount) {
    return new Promise((resolve, reject) => {
        if (bankBalance >= amount) {
            bankBalance -= amount;
            resolve(`Payment successful. Remaining balance: ₹${bankBalance}`);
        } else {
            reject("Insufficient funds");
        }
    });
}

