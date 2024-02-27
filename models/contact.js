const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    firstname: {
        type: String,
        required: 'Firstname is required',
    },
    lastname: {
        type: String,
        required: 'Lastname is required',
    },
}, { timestamps: true });

module.exports = model("contact", contactSchema);
