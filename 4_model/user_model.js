const mongoose = require('mongoose');
const userdata = mongoose.Schema;
const User = new userdata({
    Room_name: userdata.Types.String,
    sms: [{
        sender_name: userdata.Types.String,
        message: userdata.Types.String
    }]
}, {
    timestamps: true
});
const users = mongoose.model('userdata', User);
module.exports = users;