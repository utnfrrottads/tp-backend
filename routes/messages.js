const express = require('express')
const router = express.Router()

const {
        getAllMessages,
        getMessageById,
        createNewMessage,
        deleteMessage,
        updateMessage,
        getMessageByDate,
        getBySender,
        getByReceiver
    } = require('../controller/messages')


router.route('/').get(getAllMessages).post(createNewMessage)

router.route('/:id').get(getMessageById)

router.route('/delete/:id').delete(deleteMessage)

router.route('/update/:id').patch(updateMessage)

router.route('/filter/date').get(getMessageByDate)

router.route('/filter/sender').get(getBySender)


router.route('/filter/receiver').get(getByReceiver)

module.exports = router