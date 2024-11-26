const express = require("express");
const { check } = require("express-validator");
const handleValidationErrors = require("../../../utils/validation");
const bcrypt = require("bcryptjs");
const {User} = require("../../../db/models");
const { setTokenCookie } = require("../../../utils/auth");
const router = express.Router();

const validateLogin = [
	check("credential").exists({ checkFalsy: true }).notEmpty().withMessage("Valid username or email is required"),
	check("password").exists({ checkFalsy: true }).withMessage("Password is required"),
	handleValidationErrors,
];

// Get current user
// GET /api/auth
router.get(
	'/',
	(req, res) => {
	  const { user } = req;
	  if (user) {
		const safeUser = {
		  id: user.id,
		  email: user.email,
		  username: user.username,
		};
		return res.json({
		  user: safeUser
		});
	  } else return res.json({ user: null });
	}
  );

// Login a user
// POST /api/auth
router.post("/", validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
});

// Logout a user
// DELETE /api/auth
router.delete(
	'/',
	(_req, res) => {
	  res.clearCookie('token');
	  return res.json({ message: 'success' });
	}
  );

module.exports = router;
