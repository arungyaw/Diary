const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); //lodash for website add on links

let posts = [];

const homeStartingContent = "This is the home page of my diary.";
const aboutContent = "This website is a diary of my Day to day Content";
const contactContent = "Contact me at arungyaw321@gmail.com";
const composeContent = "";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));



app.get("/", function(req, res) {
  res.render("home", {
    homeDetails: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutPage: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactMe: contactContent
  });
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get('/posts/:postDay/', (req, res) => {
  const reqTitle = _.lowerCase(req.params.postDay); //params.postDay=catches the input of /posts/linkname

  posts.forEach(function(post) { //acts like for loop
    const storedTitle = _.lowerCase(post.title); //ignore the lowercase,spaces,etc. for hyperlinks add-ons

    if (storedTitle === reqTitle) {
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
