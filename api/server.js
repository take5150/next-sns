const express = require("express");
const app = express();
require("dotenv").config();
const authRoute = require("./routers/auth.js");
const postRoute = require("./routers/posts.js");
const cors = require("cors");

const PORT = 5000;
// JSON形式のデータを扱うことを宣言
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => console.log(`server is running PORT ${PORT}`));
