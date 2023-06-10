const express = require("express");
const handlebars = require("express-handlebars");
const subdomain = require("express-subdomain");
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

//all of the
app.use(subdomain("writer", require("./routers/writer/writerRoutes")));
app.use(subdomain("editor", require("./routers/editor/editorRoutes")));
app.use(subdomain("admin", require("./routers/admin/adminRoutes")));

app.use("/create-database-tables", (req, res) => {
    const models = require("./models");
    models.sequelize.sync().then(() => {
        res.send("models created successfully");
    });
});
app.use("/", require("./routers/user/indexRouter"));

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
    console.log(`server is running on port ${app.get("port")}`);
});
