const owners = require("../../../Models/Owners/Owners");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../../../Utils/CreateError");

const addOwners = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const register = new owners({
      ownername: req.body.ownername,
      email: req.body.email,
      username: req.body.username,
      dob: req.body.dob,
      password: hashpassword,
    });
    const registerOwner = await register.save();
    registerOwner &&
      res
        .status(200)
        .json({ message: "Successfully Added Owner", registerOwner });
  } catch (error) {
    next(error);
  }
};

const LoginAuth = async (req, res, next) => {
  try {
    const User = await owners.findOne({
      username: req.body.username,
    }).populate('companies')
    if (!User) {
      next(createError(404, "user not found"));
    }

    const checkCredientials = await bcrypt.compare(
      req.body.password,
      User.password
    );
    if (!checkCredientials) {
      next(createError(404, "wrong credientials"));
    }
    const token = jwt.sign(
      {
        id: User._id,
        role: User.role,
      },
      process.env.Onwer_JWT
    );
    const { role, ownername, email,_id, companies } = User._doc;
    res
      .cookie("owners_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        message: "Authenticated",
        role:role,
        token,
        id: _id,
        owner: ownername,
        email:email,
        companies: companies,
       
      })
  } catch (error) {
    next(error);
  }
};

module.exports = { LoginAuth, addOwners };
