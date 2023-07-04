const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/articles");
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect("mongodb://0.0.0.0/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })  
  .then(() => {
    console.log('Connected to MongoDB');

  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render("articles/index", {articles: articles});
})

app.use("/articles", articleRouter);

app.listen(5000);