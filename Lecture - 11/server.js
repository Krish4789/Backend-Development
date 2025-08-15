const express = require('express')
const app = express()

const path = require('path')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users' , (req , res) => {  // req , res are object

    res.send('User Page');
})

app.get('/blogs', (req, res) => {
    res.send(`
        <div>
            <h1>Welcome to My Blog</h1>
            <p>Read the latest articles on tech and life.</p>
            <p>Stay updated with fresh content every week.</p>
        </div>
    `);
});

app.get('/post' , (req, res) => {
    //res.sendFile(__dirname + "/index.html")

    res.sendFile(path.join(__dirname , "index.html"))
})

app.get('/allusers' , (req , res) => {

    let allusers = 
    [
        {
        id: 1,
        name: "Krish"
        },

        {
            id: 2,
            name: "Tanya"
        }
    ]

    res.json(allusers);
})
// ------------------------------------------------------------------------------------------------------------------------------------------
/* Path Variable

1) Params
2) Query Parameter --> Request object 

---- link ?id:

For multiple paramenter use and

--------------------------------------------------------------------------------------------
                                   PARAMS                                

    

*/
app.get('/profile/:id/:name' , (req , res) => {
    let id = req.params.id;
    let name = req.params.name;
    res.send("Profile id: " + id + "Username" +  name)

})

//-----------------------------------------------------------------------------------------------------------------------------

// Example of query parameter 

// app.get('/profile' , (req , res) => {

//     let pathvariableid = req.query.id
//     let pathvariablename = req.query.username
//     console.log(req.query);
//     res.send("Profile of id" + " " + pathvariableid + " " + pathvariablename);

// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

