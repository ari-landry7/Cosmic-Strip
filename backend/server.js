const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

let dbConnect = require("./dbConnect");
let userRoutes = require("./routes/userRoutes")
let postRoutes = require("./routes/postRoutes")

app.use(cors())

app.use(express.json());
app.use(express.static('public'));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Cosmic Strip" })
})

// set port, listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});