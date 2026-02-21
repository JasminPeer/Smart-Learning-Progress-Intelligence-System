const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');

// @desc    Get notifications for logged in user
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ recipientId: req.user._id })
        .sort({ createdAt: -1 });
    res.json(notifications);
});

// @desc    Mark notification as read or started
// @route   PUT /api/notifications/:id
// @access  Private
const updateNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    if (notification.recipientId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    notification.isRead = req.body.isRead !== undefined ? req.body.isRead : notification.isRead;
    notification.isStarted = req.body.isStarted !== undefined ? req.body.isStarted : notification.isStarted;
    notification.isSaved = req.body.isSaved !== undefined ? req.body.isSaved : notification.isSaved;

    const updatedNotification = await Notification.findByIdAndUpdate(
        req.params.id,
        {
            isRead: notification.isRead,
            isStarted: notification.isStarted,
            isSaved: notification.isSaved
        },
        { new: true }
    );

    res.json(updatedNotification);
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    if (notification.recipientId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await notification.deleteOne();
    res.json({ message: 'Notification removed' });
});

module.exports = {
    getNotifications,
    updateNotification,
    deleteNotification
};
