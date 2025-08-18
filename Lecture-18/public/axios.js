console.log(axios);
async function getData() {
    
    let data = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(data);
}

getData();

// send post request using axios 