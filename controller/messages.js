const StatusCodes = require("http-status-codes");
const Message = require("../models/Message");
const User = require("../models/User");

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    return res.status(StatusCodes.OK).json({ messages });
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err });
  }
};

const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findOne({ _id: id });
    return res.status(StatusCodes.OK).json({ message });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err });
  }
};

const createNewMessage = async (req, res) => {
  try {
    const { description, sender, receiver } = req.body;
    const date = new Date();

    const message = await new Message({
      description: description,
      date: date,
      sender: sender,
      receiver: receiver,
    });

    const newMessage = await message.save();

    return res.status(StatusCodes.OK).json({ newMessage });
  } catch (err) {
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({ msg: err });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { desc } = req.body;
    const { id } = req.params;

    if (desc === "") {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "Message should not be empty" });
    }

    const message = await Message.findByIdAndUpdate(
      { _id: id },
      { date: new Date(today) }
    );

    if (!message) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "ID Not Found" });
    }

    return res.status(StatusCodes.OK).json({ message });
  } catch (err) {
    return console.log(err);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMessage = await Message.findByIdAndRemove(id);
    return res.status(StatusCodes.OK).json({ deleteMessage });
  } catch (error) {
    return res.status(StatusCodes.NOT_IMPLEMENTED).json({ msg: error });
  }
};

// Filter with query strings
const getFilterMessages = async (req, res) => {
  let { from_date, to_date, sender, receiver } = req.query;
  let query = {};
  let query_date = {};

  if (!to_date) {
    to_date = new Date();
    to_date.setHours(0, 0, 0, 0);
  }

  if (!from_date) {
    from_date = new Date();
    from_date.setHours(0, 0, 0, 0);
  }

  query["date"] = { $gte: from_date, $lt: to_date };

  if (sender) {
    query["sender"] = sender;
  }

  if (receiver) {
    query["receiver"] = receiver;
  }

  let messages = await Message.find(query);

  if (messages.length < 1) {
    return res.status(StatusCodes.OK).json({ err: "No messages found" });
  }

  return res.status(StatusCodes.OK).json({ messages });
};

//UF
const getAllByUser = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User id cannot be empty!" });
    }

    const messages = await Message.find({
      $or: [{ receiver: id }, { sender: id }],
    });
    return res.status(StatusCodes.OK).json(messages);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: err });
  }
};

const getAllArchived = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate("archived").exec();

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
  }

  return res.status(StatusCodes.OK).json(user.archived);
};

const archiveMessage = async (req, res) => {
  const { id } = req.params;
  const { idMsg } = req.body;

  const user = await User.findById(id);
  const msg = await Message.findById(idMsg);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
  }
  if (!msg) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Message not found" });
  }
  if (msg.sender != id && msg.receiver != id) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "This is not your msg" });
  }

  const newUser = await User.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { archived: msg._id } }
  );
  return res.status(StatusCodes.OK).json(newUser.archived);
};

module.exports = {
  getAllMessages,
  getMessageById,
  createNewMessage,
  deleteMessage,
  updateMessage,
  getAllByUser,
  getAllArchived,
  archiveMessage,
  getFilterMessages,
};
