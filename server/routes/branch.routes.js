const express = require('express');
const branchRouter = express.Router();

const branchCtrl = require('../controllers/branch.controller'); //Importo el controlador de la BD
const branchValidator = require('../validators/branch.validator');

branchRouter.get('/', branchCtrl.getBranches);
branchRouter.get('/:id', branchCtrl.getBranch);
branchRouter.post('/', branchValidator.validateBranchCreate, branchCtrl.createBranch);
branchRouter.put('/:id', branchValidator.validateBranchUpdate,branchCtrl.editBranch);
branchRouter.delete('/:id', branchCtrl.deleteBranch);

module.exports = branchRouter;