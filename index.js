const express = require('express');
const handlebars = require('express-handlebars');
const subdomain = require('express-subdomain'); 
const app = express();


//set static folder 
app.use(express.static(__dirname + '/public'));

//config handlebars
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');


//all of the 
app.use('/', require('./routers/userRoutes'));
app.use(subdomain('writer',require('./routers/writerRoutes')));
app.use(subdomain('editor', require('./routers/editorRoutes')));
app.use(subdomain('admin', require('./routers/adminRoutes')));


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
    console.log(`server is running on port ${app.get('port')}`);
})