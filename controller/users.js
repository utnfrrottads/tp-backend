const User = require("../models/User");
const StatusCodes = require("http-status-codes");

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
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password, description });
    const file = req.file;
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

const updateUser = async (req, res) => {
  const {
    body: { name, email },
    params: { id: userId },
  } = req;
  if (name === "" || email === "") {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: "Name or email or password fields cannot be empty" });
  }

  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    // throw new NotFoundError(`No job with id ${jobId}`);
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
