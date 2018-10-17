

module.exports = function(err, req, res, next){
  res
    .status ( err.status || 404 || 500)
    .send({error: err  });
}