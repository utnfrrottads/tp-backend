const StatusCodes = require("http-status-codes");
const Message = require("../models/Message");

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

const getMessageByDate = async (req, res) => {
  // Ver forma de nombrar
  try {
    let { from_date, to_date } = req.body;

    if (to_date === "") {
      to_date = new Date();
    }

    if (from_date == "") {
      from_date = new Date();
      from_date.setHours(0, 0, 0, 0);
    }

    const messages = await Message.find({
      date: { $gte: from_date, $lt: to_date },
    });

    return res.status(StatusCodes.OK).json({ messages });
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err });
  }
};

const getBySender = async (req, res) => {
  try {
    let { sender } = req.body;

    const messages = await Message.find({ sender: sender });

    return res.status(StatusCodes.OK).json({ messages });
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err });
  }
};

const getByReceiver = async (req, res) => {
  try {
    let { receiver } = req.body;

    const messages = await Message.find({ receiver: receiver });

    return res.status(StatusCodes.OK).json({ messages });
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err });
  }
};

// Filtrar por todete

const getByAll = async (req, res) => {
  try {
    let { sender, receiver, from_date, to_date } = req.body;

    if (to_date === "") {
      to_date = new Date();
    }

    if (from_date == "") {
      from_date = new Date();
      from_date.setHours(0, 0, 0, 0);
    }

    const messages = await Message.find({
      receiver: receiver,
      sender: sender,
      date: { $gte: from_date, $lt: to_date },
    });
    return res.status(StatusCodes.OK).json(messages);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err });
  }
};

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
    console.log(messages);
    return res.status(StatusCodes.OK).json(messages);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: err });
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  createNewMessage,
  deleteMessage,
  updateMessage,
  getMessageByDate,
  getBySender,
  getByReceiver,
  getByAll,
  getAllByUser,
};
