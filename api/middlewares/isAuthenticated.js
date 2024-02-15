const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  // NOTE headerに指定した名称は小文字になる？
  const token = req.headers.authrorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "権限がありません。" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "権限がありません。" });
    }

    // iat = issued at / exp = expiration time
    // decoded = { id: 3, iat: 1707997627, exp: 1708084027 }
    req.userId = decoded.id;
  });

  next();
}

module.exports = isAuthenticated;
