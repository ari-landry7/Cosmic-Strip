const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, trim: true, required: true },
    imageSource: { type: String, trim: true, required: true },
    imageAlt: { type: String },
    caption: { type: String }
});

module.exports = mongoose.model("post", postSchema)