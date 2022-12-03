const fs = require('fs');



const register = (req, res) => {
    let {name, email, password, phone, city} = req.body;
    let data = `${name},${email},${password},${phone},${city}`;
    // fs.appendFile('./user/usersData.txt',data +'\n', err => {
    //     if(err) throw err;
    // })
    if(fs.existsSync(`./user/${email}.txt`))
    {
        res.render('register',{errMsg:'Email Already Registerd'})
    }
    else{
        fs.writeFile(`./user/${email}.txt`,`${name}\n${email}\n${password}\n${city}\n`,(err)=>{
            if(err){
                res.render('register',{errMsg:'Something went wrong'})
            }
            else{
                // res.render('regis',{succMsg:'Registerd Successfully'})
                res.render("login",{email,password});
            }
        })
            }
        
    
}




const login = (req, res) => {
    
    // res.render('index');
}

module.exports = {
    register, login
};