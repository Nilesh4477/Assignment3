const express = require('express');
const fs = require('fs');


const exphbs = require('express-handlebars');
const port = 8888;
const app = express();


app.use(express.static('static'));
app.use("/static", express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const loginFunc=(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (fs.existsSync(`./user/${email}.txt`)) {
        const data = fs.readFileSync(`./user/${email}.txt`, 'UTF-8').split("\n")
        // console.log(data[2])
        if(password== data[2]){
        // res.send('true')   
        res.redirect("/")
        }
        else{
            // res.send('false')
            res.send("enter valid password")
        }

    }
}



app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const mainPage = require('./routes/mainRouter');
const userPage = require('./routes/usersRouter');

app.use('/', mainPage);
app.use('/user', userPage);

app.post('/login-data',loginFunc)

app.listen(port, (err) => {
    if (err) throw err;

    console.log(port);
})