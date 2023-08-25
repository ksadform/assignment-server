const mongoose = require('mongoose');

exports.notificationSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
});

