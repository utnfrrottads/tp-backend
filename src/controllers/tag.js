const { Tag } = require('../models/index');

const tagController = {
    getTags: async (req,res) => {
        try {
            const tags = await Tag.find({}).exec();
            res.send({success:true,tags});

        } catch (error) {
            res.status(500).send({success:false,message: "Error finding tags"})
        }
    },

    getTag: async (req,res) => {
        try {
            const tag = await Tag.findById(req.params.id).exec();
            
            if(!tag) return res.status(404).send({success:false,message: `There is no tag with ID: ${req.params.id}`});
            
            res.send({success:true,tag});

        } catch (error) {
            res.status(500).send({success:false,message:"Error finding tag"})
        }
    },

    createTag: async (req,res) => {
        try {
            const newTag = new Tag({description: req.body.description});
            
            await newTag.save();
           
            res.send({success:true, newTag})
        } catch (error) {
            res.status(500).send({success:false,message:"Error creating tag"})
        }
    },

    deleteTag: async (req,res) => {
        try {
            const removedTag = await Tag.findByIdAndRemove(req.params.id).exec();
            
            if(!removedTag) return res.status(404).send({success:false,message: `There is no tag with ID: ${req.params.id}`});
            
            res.send({success:true, removedTag})
        } catch (error) {
            res.status(500).send({success:false,message:"Error deleting tag"})
        }
    },

    updateTag: async (req,res) => {
        try {
            const updatedTag = await Tag.findByIdAndUpdate(req.params.id, {description: req.body.description}).exec();
            
            if(!updatedTag) return res.status(404).send({success:false, message: `There is no tag with ID: ${req.params.id}`});
        
            res.send({success:true,updatedTag});

        } catch (error) {
            res.status(500).send({success:false,message:"Error updating tag"})
        }
    },
};

module.exports = tagController;

