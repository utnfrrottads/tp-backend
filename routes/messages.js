const express = require('express')
const router = express.Router()

const {
        getAllMessages,
        getMessageById,
        createNewMessage,
        deleteMessage
    } = require('../controllers/messages')


router.route('/').get(getAllMessages).post(createNewMessage)

router.route('/:id').get(getMessageById)

router.route('/delete/:id').delete(deleteMessage)

module.exports = router