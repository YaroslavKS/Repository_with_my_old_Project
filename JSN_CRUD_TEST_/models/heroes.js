const mongoose = require("mongoose");
const heroesSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: false,
    },
    real_name: {
        type: String,
        required: false,
    },
    origin_description: {
        type: String,
        required: false,
    },
    superpowers: {
        type: String,
        required: false,
    },
    catch_phrase: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    created: {
        type: Date,
        required: false,
        default: Date.now,
    },
});

module.exports = mongoose.model("Heroes", heroesSchema);
