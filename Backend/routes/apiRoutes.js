const express = require("express");
const router = express.Router();
const db = require("../models");

// get single cama by id
router.get("/find/:id", (req, res) => {
    db.Cama.findAll({
      where: {
        id: req.params.id
      }
    }).then(cama => res.send(cama));
  });

// post new cama //no funciona, arreglar
router.post("/new", (req, res) => {
    const body = req.body;
    db.Cama.create({
      id: body.id,
      estado: body.estado
    }).then(submitedCama => res.send(submitedCama));
  });

  // delete cama
router.delete("/delete/:id", (req, res) => {
    db.Cama.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.send("success"));
  });

  // edit a cama
router.put("/edit", (req, res) => {
    db.Cama.update(
      {
        text: req.body.text
      },
      {
        where: { id: req.body.id }
      }
    ).then(() => res.send("success"));
  });
  
  module.exports = router;