const jwt = require("jsonwebtoken");
const secretkey = "Project12345#@";

module.exports = (req, res, next) => {
  token = req.headers[ "authorization"];
  if (token) {
    jwt.verify(token, secretkey, function (err, decoded) {
        if (err) {
            return res.status(403).json({ "status": false, "message": 'Unauthorized access.' });
        }
        req.decoded = decoded;
        next();
    });
}
else {
    return res.status(403).send({
        status: 403,
        success: false,
        message: "No Token Found "
    });
}

};
