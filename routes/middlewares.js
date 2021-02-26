function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
  } else {
    next();
  }
  // if (token == null) return res.sendStatus(401);
  // jwt.verify(token, process.env.SECRET_ACCES_TOKEN, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user;
  //   next();
  // });
}

function refreshToken(req, res, next) {
  jwt.verify(token, process.env.SECRET_ACCES_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { verifyToken, refreshToken };
