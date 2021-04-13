const express = require('express');
const branchRouter = express.Router();
const branchCtrl = require('../controllers/branch.controller');

branchRouter.get('/', branchCtrl.getBranches);
branchRouter.get('/:id', branchCtrl.getBranch);
branchRouter.post('/', branchCtrl.createBranch);
branchRouter.put('/:id', branchCtrl.editBranch);
branchRouter.delete('/:id', branchCtrl.deleteBranch);

module.exports = branchRouter;