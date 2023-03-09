const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv=require('dotenv');

dotenv.config({path:'./config.env'});

mongoose.connect(process.env.DB_LOCAL).then(()=>{console.log("db connected successfully")});

const expenseSchema =new mongoose.Schema({
    detail : String,
    date : String,
    amount : Number
});

const Expense = mongoose.model("Expense",expenseSchema);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// app.get("/", function (req,res){
//     res.send(arr);
// });

app.post("/api/delete", function(req, res){
    const checkedExpenseId = req.body._id;

    Expense.findByIdAndRemove(checkedExpenseId, function(err){
        if(!err){
           
        }
    })
})

app.post("/api", function (req, res){

    const expense = new Expense(req.body);
    expense.save();
});

app.get("/api/output",function(req, res){
    Expense.find(function(err, expenses){
        if(err){
            console.log(err);
        }else{
            res.send(expenses);
        }
    })
})

app.listen(process.env.PORT, () => console.log('server is up'));
