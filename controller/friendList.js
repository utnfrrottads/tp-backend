const StatusCodes = require("http-status-codes");
// const FriendList = require("../models/friendList");
const User = require("../models/User");

const getListByOwner = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const owner = await User.findById({ _id: ownerId });
    if (owner.friends.length === 0) {
      //return res.status(StatusCodes.OK).json({ msg: "No friends found" });
      return res.status(StatusCodes.OK).json([]);
    }
    const listWithData = await Promise.all(
      owner.friends.map(async (id) => {
        return await User.findById(id);
      })
    );

    console.log(listWithData);

    return res.status(StatusCodes.OK).json(listWithData);
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

const getUsersNotFriends = async (req, res) => {
  const { ownerId } = req.params;
  try {
    const owner = await User.findOne({ _id: ownerId });

    if (!owner) {
      return res.status(StatusCodes.NOT_FOUND).send(error);
    }

    const usersNotInTheFriendList = await User.find({
      $and: [{ _id: { $nin: owner.friends } }, { _id: { $ne: owner._id } }],
    });

    return res.status(StatusCodes.OK).json(usersNotInTheFriendList);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send(error);
  }
};

module.exports = {
  getListByOwner,
  addFriend,
  deleteFriend,
  deleteList,
  getUsersNotFriends,
};
