const user = require('../models/user');

module.exports.get_all = (req, res) => {
    user.find({}, (err, users)=>{
       err ? res.json(err) : res.json(users);
    });
}

module.exports.get_signup = (req, res) => {
    if (req.query) {
        const user1 = req.query;
        user.create(user1, (err, user) => err ? res.json(err) : res.json(user));
    } else {
        res.json("No user query submitted");
    }
}

module.exports.get_login = (req, res) => {
    if (req.query) {
        const user1 = req.query;
        user.find(user1, (err, user) => err ? res.json(err) : res.json(user));
    } else {
        res.json("No user query submitted");
    }
}

module.exports.get_userdata = (req, res) => {
    if (req.query) {
        const user1 = req.query;
        user.find(user1, (err, user) => err ? res.json(err) : res.json(user));
    } else {
        res.json("No user query submitted");
    }
}