import express from "express";


const app = express();
const port = 3000;
var blogContent = []
var count = 1
var position = {
    left: 0,
    top: 0,
}


app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {contents: blogContent})
});

app.post("/submit", (req, res) => {
    position = {
        top: Math.random()*(90-10)-10,
        left: Math.random()*(90-10)-10,
    }
    blogContent.unshift({position, count, title: `${req.body["title"]}`, content:`${req.body["blog-entry"]}`})
    count ++
    res.redirect("/");
    });

app.delete("/close", (req, res) => {

    blogContent.splice(blogContent.findIndex(el => el.count == req.body["count"]), 1)
    count++

        res.redirect("/")
        });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});