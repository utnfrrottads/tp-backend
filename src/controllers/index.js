"use strict";

const controller = {
  home: (req, res) => {
    return res.status(200).send({
      message: "I'm the homepage",
    });
  },
};

module.exports = controller;
