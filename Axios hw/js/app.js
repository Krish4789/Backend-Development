function sendData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const data = {
        name: name,
        email: email
    };

    axios.post('https://jsonplaceholder.typicode.com/posts', data)
      .then(function(response) {
          console.log('Response:', response.data);
          alert('Data sent successfully!');
      })
      .catch(function(error) {
          console.error('Error sending data:', error);
          alert('Error occurred!');
      });
}
