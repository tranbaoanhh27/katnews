"use strict";
require("dotenv").config();

const express = require("express");
const handlebars = require("express-handlebars");
const subdomain = require("express-subdomain");
const models = require("./models");
const session = require("express-session");
const redisStore = require("connect-redis").default;
const { createClient } = require("redis");
const passport = require("./controllers/passport");
const connectFlash = require("connect-flash");
const { createPagination } = require("express-handlebars-paginate");
const { initializeApp } = require("firebase/app");
const logger = require('morgan');
const braintree = require('braintree');

// Configure redis connection
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().then(() => {
    // Paypal Braintree Gateway configs
    const braintreeGateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    });

    // Firebase configuration
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    };
    const firebaseApp = initializeApp(firebaseConfig);
    module.exports = { braintreeGateway, firebaseApp };

    // Initialize ExpressJS application
    const app = express();
    app.use(logger('dev'));

    // Set static folder
    app.use(express.static(__dirname + "/public"));

    // Config handlebars
    app.engine(
        "hbs",
        handlebars.engine({
            layoutsDir: __dirname + "/views/layouts",
            partialsDir: __dirname + "/views/partials",
            extname: "hbs",
            defaultLayout: "layout",
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
            },
            helpers: {
                createPagination,
                equal: function (a, b) {
                    return a === b;
                }
            },
        })
    );
    app.set("view engine", "hbs");

    // To be able to get data from POST request body
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Setup session
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            store: new redisStore({ client: redisClient }),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 20 * 60 * 1000,
                httpOnly: true,
            },
        })
    );

    // To create database tables
    // app.use("/create-database-tables", (req, res) => {
    //     const models = require("./models");
    //     models.sequelize.sync().then(() => {
    //         res.send("models created successfully");
    //     });
    // });

    // Save subdomains to session so that passport.deserializeUser knows
    // what subdomain being used
    app.use((request, response, next) => {
        request.session.subdomains = request.subdomains;
        next();
    });

    // Setup Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Setup Connect Flash
    app.use(connectFlash());

    // Subdomains routes
    app.use("/auth", subdomain("writer", require("./routers/writer/authRoutes")));
    app.use("/edit", subdomain("writer", require('./routers/writer/editRoutes')));
    app.use("/", subdomain("writer", require("./routers/writer/writerRoutes")));

    app.use("/auth", subdomain("editor", require("./routers/editor/authRoutes")));
    app.use("/edit", subdomain("editor", require("./routers/editor/editRoutes")));
    app.use(subdomain("editor", require("./routers/editor/editorRoutes")));

    app.use("/auth", subdomain("admin", require("./routers/admin/authRouter")));
    app.use(subdomain("admin", require("./routers/admin/adminRouter")));

    // User's Middleware
    app.use(require('./controllers/user/accountController').middleware);
    app.use(async (request, response, next) => {
        // Query categories for header menu
        const categories = await models.Category.findAll({
            attributes: ["id", "name"],
            include: [
                {
                    model: models.SubCategory,
                    attributes: ["id", "name"],
                },
            ],
        });
        response.locals.headerCategories = categories;
        next();
    });

    app.use("/", require("./routers/user/indexRouter"));
    app.use("/news", require("./routers/user/newsRouter"));
    app.use("/auth", require("./routers/user/authRouter"));
    app.use("/account", require("./routers/user/accountRouter"));

    // Handle request from client to generate braintree client token
    app.get('/braintree_client_token', (req, res) => {
        const customerId = req.user ? req.user.braintreeCustomerId : null;
        braintreeGateway.clientToken.generate({ customerId: customerId }, (error, response) => {
            res.json({ clientToken: response.clientToken });
        })
    });

    app.use((req, res, next) => {
        res.locals.pageTitle = 'Không tìm thấy trang!';
        res.status(404).render("error", { message: "404 - File not Found!" });
    });

    app.use((error, req, res, next) => {
        console.error(error);
        res.locals.pageTitle = 'Lỗi Server';
        res.status(500).render("error", { message: "500 - Internal Server Error!" });
    });

    app.set("port", process.env.PORT || 5000);
    app.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
    });
}).catch(error => console.log(error));
