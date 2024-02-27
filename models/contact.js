const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    notes: {
        type: String
    }
}, { timestamps: true })

module.exports = model("contact", contactSchema);