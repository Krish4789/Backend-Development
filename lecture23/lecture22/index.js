const express = require('express');
const app = express();
const connectDB = require('./config/database');
const userRouter = require('./router/userrouter');
const blogRouter = require('./router/blogrouter');
const { sendResponse } = require('./utils/response');

app.use(express.static(__dirname+'/public'));
app.use(express.json());              
app.use(express.urlencoded({ extended: true }));  

app.get('/health', (req, res) => {
  sendResponse(res, true, "Welcome to the server!", { status: "ok" });
});

connectDB();

app.use('/', userRouter);
app.use('/', blogRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);