const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    alt: { type: String },
    caption: { type: String }
});

module.exports = mongoose.model("post", postSchema)