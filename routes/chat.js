import express from 'express';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// Get all chat rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await ChatRoom.find()
      .populate('creator', 'username avatar')
      .populate('members', 'username avatar status');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create chat room
router.post('/rooms', async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    
    const room = new ChatRoom({
      name,
      description,
      isPrivate,
      creator: req.userId,
      members: [req.userId]
    });
    
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Join chat room
router.post('/rooms/:roomId/join', async (req, res) => {
  try {
    const room = await ChatRoom.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    if (!room.members.includes(req.userId)) {
      room.members.push(req.userId);
      await room.save();
    }
    
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get room messages
router.get('/rooms/:roomId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ chatRoom: req.params.roomId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: 1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get direct messages
router.get('/messages/direct/:userId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.userId, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.userId }
      ]
    })
      .populate('sender', 'username avatar')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select('username email avatar status lastSeen');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get notifications
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.userId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.put('/notifications/:notificationId/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;