const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const Storage = multer.diskStorage({
  destination: path.join(__dirname, "public/", "images"),
  // destination: (req, file, cb) => {
  //   cb(null, "public/images");},
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: Storage });
app.post(
  "/api/upload",
  /*upload.single("file")*/ async (req, res) => {
    try {
      const upload = multer({ storage: Storage }).single("file");
      upload = (req, res, err) => {
        if (!req.file) {
          return res.send("please select an image");
        } else if (err instanceof multer.MulterError) {
          return res.send(err);
        } else if (err) {
          return res.send(err);
        }
      };
      return res.status(200).json("File uploaded.");
    } catch (err) {
      console.log(err);
    }
  }
);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.listen(8800, () => {
  console.log("server started");
});
