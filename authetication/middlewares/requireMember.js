
const Members = require('../../config/members');

module.exports = (req, res, next) => {
    const {role, email} = req.body;
    
    if( !Members[role] || Members[role].email.toLowerCase() !== email.toLowerCase()) {
        console.log(Members[role].email);
        return res.status(422).send({
            error: "Can not validate you as a member. Please contact support."})
    }
    
    return next();
}