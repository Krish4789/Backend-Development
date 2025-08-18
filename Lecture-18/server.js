const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/todos', (req, res) => {
  const { todo } = req.body;  

  console.log("Received todo:", todo);  

  res.json({
    success: true,
    message: "todo added successfully"
  });
});

const PORT = 7778;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
