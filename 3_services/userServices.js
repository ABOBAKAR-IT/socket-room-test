const user = require('../4_model/user_model');
module.exports.add = async (body) => {
    try {
        console.log("body : " + body);
        const userdata = new user({
            Room_name: body,
        })
        let data = await userdata.save()
        return data

    } catch (error) {
        console.log(error);
    }
};

module.exports.update = async (body, name) => {
    let d = await user.findOneAndUpdate({
        Room_name: name
    }, {
        $push: {
            sms: body
        }
    })

};

module.exports.find = async (body) => {
    try {
        let data = await user.findOne({
            Room_name: body
        })
        return data

    } catch (error) {
        console.log(error);
    }
};
// module.exports.findone = async (body) => {
//     user.find({id:req.body.id})
//     .then(data=>res.send(data))
//     .catch(err=>res.send(err));
// };
// module.exports.del = async (body) => {

// };