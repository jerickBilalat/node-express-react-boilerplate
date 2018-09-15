
// note: need the what is the user role to know which components they have access to

module.exports.signin = (req,res, next) => {
    res.send({message: "signin"});
}