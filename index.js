const express = require("express");
const app = express();
const prot = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine ", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Krishika",
        content: "Lovable Person",
    },

    {
        id: uuidv4(),
        username: "Krish",
        content: "Hard Work is important to achieve success!",
    },

    {
        id: uuidv4(),
        username: "Vanshika",
        content: "I Found Both Of Them..!",
    },
];

//INDEX ROUTE
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});


//NEW ROUTE / CREATE ROUTE
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    // console.log(id);
    let newpost = { id, username, content };
    posts.push(newpost);
    console.log(newpost);
    res.redirect("/posts");
})

//SHOW ROUTE

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        console.log("error in showing ejs page");
        res.render("index.ejs");
    }
});


//EDIT ROUTE
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post)
        res.render("edit.ejs", { post });
    else
        res.redirect("index.ejs");
});

//DELETE ROUTE
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
})

app.listen(prot, () => {
    console.log("listening to port :8080");
});