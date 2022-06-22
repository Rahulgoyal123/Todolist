// module.exports=Router;
const express = require("express");
const bodyparser = require("body-parser");
const date =require(__dirname+"/date.js");

// console.log(date());

const app = express();
app.use("view engine", "ejs");
let workitem = [];
let items = ["Buy Food", "Cook Food", "Eat Food"];

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  // res.send("hello world");
  let day =date();
  

  res.render("list.ejs", { listtitle: day, newlistitems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newitem;
  if (req.body.list == "work") {
    workitem.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list.ejs", { listtitle: "work List", newlistitems: workitem });
});

app.post("/work", function (req, res) {
  let item = req.body.newitem;
  workitem.push(item);
  res.redirect("/work");
});

app.get("/about",function(req,res){
  res.render("about.ejs")
})
app.listen(process.env.PORT || 3000, function () {
  console.log("server is running on port 3000");
});
