

module.exports = function(err, req, res, next){
  req.log.error(err);
  return next(err);
}