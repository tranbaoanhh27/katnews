const express = require('express');
const handlebars = require('express-handlebars')
const app = express();

app.use(express.static(__dirname + '/public'));
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res)=> {
    res.render("home");
})

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
    console.log(`server is running on port ${app.get('port')}`);
})