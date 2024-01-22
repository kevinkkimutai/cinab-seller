const jwt = require("jsonwebtoken");
const { User } = require("../models");

const refreshTokenController = {
  getRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      return res.status(401).send();
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

      const existingUser = await User.findOne({
        where: { email: decoded.email },
      });

      if (!existingUser) {
        return res.status(401).send();
      }

      const newAccessToken = jwt.sign(
        {
          email: decoded.email,
          id: decoded.id,
          schoolCode: decoded.schoolCode,
          username: decoded.name,
        }, // Include schoolCode from existingUser
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(403).send();
    }
  },
};

module.exports = refreshTokenController;