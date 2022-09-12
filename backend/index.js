port = 3000;

const express = require("express");
const app = express();
const conn = require("./db/conn");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
const UserRoute = require("./routes/UserRoutes");
app.use("/user", UserRoute)


app.listen(port, ()=>{
    console.log(`App rodando na porta ${port}`)
})