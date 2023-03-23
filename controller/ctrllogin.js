const {
  loginValidator,
  singupValidator,
} = require("../helper/validationHelper.js");
const User = require("../Models/User.Model");
// const ErrorHandler = require('../utils/errorHandler')
const ErrorHandler = require("http-errors");
const bcrypt = require("bcrypt");
const AccountType = require("../Models/AccountType.Model");
const converthashpassword = require("../utils/hashPassword.js");
const { trycatchBlock } = require("../utils/trycatchblock.js");
const { authloginJwt } = require("../helper/jwttokensing.js");

// for register a new user
exports.ctrlsingup = trycatchBlock(async (req, res, next) => {
  let { error, value } = singupValidator(req.body);

  if (error) return next(ErrorHandler.UnprocessableEntity(error.message));
  const accuntTypeId = await AccountType.findOne({
    accountType: value.accounttype,
  });
  const UserExists = await User.findOne({ username: value.username });

  if (UserExists) return next(ErrorHandler.Conflict("User already exists"));

  const newPass = await converthashpassword(value.password);

  const newUser = await User.create({
    username: value.username,
    password: newPass,
    accounttypeId: accuntTypeId._id.toString(),
  });
  let userObj = {
    id: newUser._id,
    username: newUser.username,
    accounttype: value.accounttype,
  };
  res.status(201).send({ status: true, newUser: userObj });
});

//For login process
exports.ctrllogin = trycatchBlock(async (req, res, next) => {
  const { username, password } = req.body;

  let { error } = loginValidator(req.body);
  if (error) return next(ErrorHandler.UnprocessableEntity(error.message));

  const user = await User.findOne({ username });
  if (!user)
    return next(ErrorHandler.NotFound("Authentication failed. User not found"));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return next(
      ErrorHandler.UnprocessableEntity(
        "Authentication failed. Wrong Username or password"
      )
    );
  if (user && isMatch) {
    await delete user.password;
    let token = await authloginJwt(user);
    res.status(200).send({
      status: true,
      token,
      //   user,
    });
  }
  // let token = await authloginJwt(req);

  // console.log(token);
});
