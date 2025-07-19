const mongoose = require("mongoose");

const tempOrderSchema = new mongoose.Schema({
    txnRef: String,
    data: Object,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // xoá sau 1 tiếng
    },
});

module.exports = mongoose.model("TempOrder", tempOrderSchema);
