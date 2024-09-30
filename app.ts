const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const blogsRouter = require("./routes/blogsRouter");
const authRouter = require("./routes/authRouter");
const commentsRouter = require("./routes/commentsRouter");

const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/posts", blogsRouter);
app.use("/api", commentsRouter);
app.use("/api", authRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
