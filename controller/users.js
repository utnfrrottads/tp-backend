const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Error" });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, description,file } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt); // Repetir en Update, asi se sigue encriptando la contrasenia

    const user = await User.create({ name, email, password:hashPassword, description });
    //const file = req.file;
    if (file) {
      user.setImgUrl(file.filename);
    } else {
      user.profileImage = "";
    }
    
    await user.save();
    return res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({ msg: error });
  }
};

// Funciona pero no encrypta la password
const updateUser = async (req, res) => {
  const {
    body: { name, email, password, description },
    params: { id: userId },
  } = req;

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { name: name, email: email, password: password, description: description },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Not found any user with that id" });
  }
  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(StatusCodes.OK).json({ msg: `User not find ${id}` });
    }
    return res.status(StatusCodes.OK).json({ msg: `deleted user ${id}` });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_IMPLEMENTED)
      .json({ msg: `CANNOT deleted user ${user}` });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
