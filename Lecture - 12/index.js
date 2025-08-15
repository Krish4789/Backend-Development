const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: true })) // It parses urlencoded data into object

const path = require('path')
const port = 3000

const fs = require('fs');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/Users', (req, res) => {
  let username = req.body.Username;
  let password = req.body.password;
  console.log(username, password);

  let user = {
    username: username,
    password: password
  };

  let alluser = []

  fs.readFile("./user.json" , "utf-8" , function(err , data)
{
  if(err) return res.send(err);
  if(data)
  {
    alluser = JSON.parse(data)
  }
  alluser.push(user);

  fs.writeFile('./user.json', JSON.stringify(alluser), function (err) {
    if (err) return res.send(err);
    res.send("User added");
  })

})

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Make a post --> login api with username and password create a login.html and make a get request to get login file

/*------------------------------------------Post Request :----------------------------------------
Get --> When you don't want to change state of the server

1) Cannot send post through web server
2) Send using form

Post --> req.body --> form --> urlencode --> parse --> app.use(express.urlencoded)
*/
