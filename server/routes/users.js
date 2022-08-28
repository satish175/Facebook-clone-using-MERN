const router = require("express").Router();
const User = require("../models/User");

// // update user
router.put("/:id", async (req, res) => {
  if (req.body.UserId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(403).json("Your details didn't get updated");
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    await res.status(403).json("you can update only your account");
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user details
router.delete("/:id", async (req, res) => {
  if (req.body.UserId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account delted sucessfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.send("you can only delete your account");
  }
});

//get a user details

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, _id, desc, __v, ...other } = user._doc;
    res.status(200).send(other);
  } catch (err) {
    return res.status(403).send("err");
  }
});

//follow a user
router.put("/follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.send("now follow this user");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(403).send(err);
    }
  } else {
    res.status(500).send("you can't follow yourself");
  }
});

//unfollow a user
router.put("/unfollow/:id", async (req, res) => {
  if (!req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await userId.updateOne({ $pull: { following: req.params.id } });
        res.send("now you unfollow this user");
      }
    } catch (err) {
      res.status(403).send(err);
    }
  } else {
    res.status(500).json("you don't follow this user");
  }
});

module.exports = router;
