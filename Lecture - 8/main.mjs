let products = [
    { id: 1, name: "Iphone 16", price: 10000 },
    { id: 2, name: "Samsung S24", price: 12000 },
    { id: 3, name: "Google Pixel 8", price: 11000 },
    { id: 4, name: "OnePlus 12", price: 9000 },
    { id: 5, name: "Xiaomi Mi 14", price: 8000 }
];

let bankBalance = 15000;

function buyProduct(productName) {
    return new Promise((resolve, reject) => {
        let productPrice = null;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name === productName) {
                productPrice = products[i].price;
                break;
            }
        }
        if (productPrice !== null) {
            resolve(productPrice);
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

async function main() {
    try {
        let amount = await buyProduct("Motorolla");
        console.log(`Product price: ₹${amount}`);

        let mes = await pay(amount);
        console.log(mes);
    } catch (error) {
        console.error(error);
    }
}

main();
