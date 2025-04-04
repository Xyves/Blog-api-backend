const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const blogsRouter = require("./routes/blogsRouter");
const authRouter = require("./routes/authRouter");
const commentsRouter = require("./routes/commentsRouter");
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "https://blog-api-xyves.netlify.app",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
// Routes
app.use("/api/posts", blogsRouter);
app.use("/api", commentsRouter);
app.use("/api", authRouter);
app.all("*", (req: any, res: any) => {
  try {
    res.status(404).json({
      timestamp: Date.now(),
      msg: "No root matches your request",
      code: 404,
    });
  } catch (e: any) {
    throw new Error(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
type ErrorResponse = {
  timestamp: number;
  msg: string;
  code: number;
};
