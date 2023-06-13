'use strict';
require('dotenv').config();

const express = require("express");
const handlebars = require("express-handlebars");
const subdomain = require("express-subdomain");
const models = require('./models');
const session = require('express-session');
const redisStore = require('connect-redis').default;
const { createClient } = require('redis');
const userPassport = require('./controllers/user/passport');
const adminPassport = require('./controllers/admin/passport');
const connectFlash = require('connect-flash');
const { isLoggedIn } = require('./controllers/user/authController');

// Configure redis connection
const redisClient = createClient({
    url: process.env.REDIS_URL
});
redisClient.connect().catch(console.error);

// Initialize ExpressJS application
const app = express();

//set static folder
app.use(express.static(__dirname + "/public"));

//config handlebars
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
}));
app.set('view engine', 'hbs');

// To be able to get data from POST request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup session
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     store: new redisStore({ client: redisClient }),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 20 * 60 * 1000,
//         httpOnly: true,
//     }
// }));

//all of the router
app.use(subdomain("writer", require("./routers/writer/writerRoutes")));
app.use(subdomain("editor", require("./routers/editor/editorRoutes")));


// Setup Admin's Passport
app.use(adminPassport.initialize());
app.use(adminPassport.session());

// Setup Connect Flash
app.use(connectFlash());

app.use("/auth", subdomain("admin", require("./routers/admin/authRouter")));
app.use(subdomain("admin", require("./routers/admin/adminRouter")));

// Setup User's Passport
app.use(userPassport.initialize());
app.use(userPassport.session());



app.use("/create-database-tables", (req, res) => {
    const models = require("./models");
    models.sequelize.sync().then(() => {
        res.send("models created successfully");
    });
});

// User's Middleware
app.use(async (request, response, next) => {
    // Authentication
    response.locals.isLoggedIn = request.isAuthenticated();
    console.log(request.isAuthenticated());

    if (request.user) {
        response.locals.headerUser = {
            name: request.user.fullName,
            isPremium: true,
        };
    }

    // Query categories for header menu
    const categories = await models.Category.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: models.SubCategory,
            attributes: ['id', 'name']
        }]
    });
    response.locals.categories = categories;
    next();
});



app.use("/", require("./routers/user/indexRouter"));
app.use("/news", require("./routers/user/newsRouter"));
app.use("/auth", require("./routers/user/authRouter"));
app.use('/account', require('./routers/user/accountRouter'));


app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
    console.log(`server is running on port ${app.get("port")}`);
});