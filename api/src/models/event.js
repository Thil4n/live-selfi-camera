const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        code: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
