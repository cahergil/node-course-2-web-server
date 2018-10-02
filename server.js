const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');


app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err) {
            console.log('there was an error');
            
        }
    });
    
    next();
})

// app.use((req,res,next) => {
//     res.render('mainteinance.hbs');
//     //this time dont call next( )
// })

//put it here below so that teh maintenance works with help path also
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
//an incoming http request at localhost:3000
console.log(__dirname);
app.get('/',(req,res)=>{

    // res.send('<h1>hello express</h1>');
    // res.send({
    //     name: 'cArlos',
    //     likes : [
    //         'Biking',
    //         'Cities'
    //     ]
    // })
    res.render('index.hbs',{
        pageTitle: 'Index page',
        welcomeMessage: 'Hello Welcome to my website'
    });
});

app.get('/about',(req,res) => {
    // res.send('About page');
    res.render('about.hbs',{
        pageTitle: 'About page'
     
    });
});

app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects'
    });
});

// /bad -send back json with a errorMessage
app.get('/bad', (req, res) =>{
    res.send({
        errorMessage:'bad request'
    })
});

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
    
});