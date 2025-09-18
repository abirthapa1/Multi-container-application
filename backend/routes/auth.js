const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    //encrypting password using bcryptjs
    const hashPassword = bcrypt.hashSync(password);

    const user = new User({ email, username, password: hashPassword });

    await user
      .save()
      .then(() => res.status(200).json({ message: "Sign up successful!" }));
  } catch (error) {
    res.status(200).json({ message: "User Already exists" });
  }
});

//SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(200).json({ message: "Please sign up first!!!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(200).json({ message: "Password don't match!??" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(200).json({ message: "User Already exists" });
  }
});
module.exports = router;
