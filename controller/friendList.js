const StatusCodes = require("http-status-codes");
// const FriendList = require("../models/friendList");
const User = require("../models/User");

const getListByOwner = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const owner = await User.findById({ _id: ownerId });
    if (owner.friends.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("No list found");
    }
    return res.status(StatusCodes.OK).json(owner.friends);
  } catch (error) {
    console.log(error);
  }
};

const addFriend = async (req, res) => {
  const { ownerId, friendId } = req.params;
  try {
    const owner = await User.findOne({ _id: ownerId });
    if (!owner.friends) {
      return res.status(StatusCodes.NOT_FOUND).send("No list found");
    }
    const friend = await User.findOne({ _id: friendId });
    if (!friend) {
      return res.status(StatusCodes.NOT_FOUND).send("No friend found");
    }
    const newList = await User.findByIdAndUpdate(
      { _id: ownerId },
      { $addToSet: { friends: friendId } }
    );

    return res.status(StatusCodes.OK).json(newList);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

const deleteFriend = async (req, res) => {
  const { ownerId, friendId } = req.params;
  try {
    const owner = await User.findOne({ _id: ownerId });
    if (!owner.friends) {
      return res.status(StatusCodes.NOT_FOUND).send("No list found");
    }
    const friend = await User.findOne({ _id: friendId });
    if (!friend) {
      return res.status(StatusCodes.NOT_FOUND).send("No friend found");
    }
    const newList = await User.findByIdAndUpdate(
      { _id: ownerId },
      { $pull: { friends: friendId } }
    );
    return res.status(StatusCodes.OK).json(newList);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send(error);
  }
};
const deleteList = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const owner = await User.findOne({ _id: ownerId });
    if (!owner.friends) {
      return res.status(StatusCodes.NOT_FOUND).send("No list found");
    }
    const newOwner = await User.findByIdAndUpdate(
      { _id: ownerId },
      { $set: { friends: [] } }
    );
    return res.status(StatusCodes.OK).json(newOwner);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

module.exports = {
  getListByOwner,
  addFriend,
  deleteFriend,
  deleteList,
};
