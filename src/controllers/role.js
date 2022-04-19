const models = require('../models');

const roleController = {
  getRoles: async (req, res) => {
    await Role.find({}).exec((err, roles) => {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: "Error finding roles" });

      if (!roles)
        return res
          .status(404)
          .send({ success: false, message: "There are no roles" });

      return res.status(200).send({
        success: true,
        roles: roles,
      });
    });
  },

  getRole: async (req, res) => {
    let roleId = req.params.id;
    if (roleId == null) {
      return res.status(400).send({ success: false, message: "Wrong request" });
    }

    await Role.findById(roleId, (err, role) => {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: "Error finding role" });

      if (!role)
        return res
          .status(404)
          .send({ success: false, message: "Could not find role" });

      return res.status(200).send({
        success: true,
        role: role,
      });
    });
  },

  createRole: (req, res) => {
    let role = new Role();

    role.description = req.body.description;

    Role.create(role, (err, insertedRole) => {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: "Error creating role" });

      if (!insertedRole)
        return res
          .status(500)
          .send({ success: false, message: "Error creating role" });

      return res.status(200).send({ success: true, role: insertedRole });
    });
  },

  updateRole: async (req, res) => {
    let roleId = req.params.id;

    let newRole = {
      description: req.body.description,
    };
    
    await Role.findOneAndUpdate(roleId, newRole, (err, roleUpdated) => {
      if (err)
        return res
          .status(500)
          .send({
            success: false,
            message: "Error updating role" + err.message,
          });

      if (!roleUpdated)
        return res
          .status(500)
          .send({ success: false, message: "Error updating role" });

      return res.status(200).send({
        success: true,
        role: roleUpdated,
      });
    });
  },

  deleteRole: async (req, res) => {
    var roleId = req.params.id;

    await Role.findByIdAndRemove(roleId, (err, roleRemoved) => {
      if (err)
        return res.status(500).send({ message: "Could not delete role" });

      if (!roleRemoved)
        return res.status(404).send({ message: "Did not find role" });

      return res.status(200).send({
        role: roleRemoved,
      });
    });
  },
};

module.exports = roleController;