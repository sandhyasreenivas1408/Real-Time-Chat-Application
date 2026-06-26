import User from '../models/User.js';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import { socketAuthMiddleware } from '../middleware/auth.js';

const userSockets = new Map(); // Map of userId -> socketId

export const handleSocketConnection = (socket, io) => {
  const token = socket.handshake.auth.token;
  
  try {
    const decoded = socketAuthMiddleware(token);
    const userId = decoded.userId;
    
    userSockets.set(userId, socket.id);
    
    // Update user status to online
    User.findByIdAndUpdate(userId, { status: 'online', lastSeen: new Date() }).catch(console.error);
    
    // Broadcast user online status
    io.emit('userOnline', { userId, timestamp: new Date() });
    
    // Handle join room
    socket.on('joinRoom', (data) => {
      socket.join(`room-${data.roomId}`);
      io.to(`room-${data.roomId}`).emit('userJoinedRoom', {
        userId,
        roomId: data.roomId,
        timestamp: new Date()
      });
    });
    
    // Handle message in room
    socket.on('message', async (data) => {
      try {
        const message = new Message({
          content: data.content,
          sender: userId,
          chatRoom: data.roomId,
          messageType: data.messageType || 'text'
        });
        
        await message.save();
        await message.populate('sender', 'username avatar');
        
        io.to(`room-${data.roomId}`).emit('newMessage', message);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });
    
    // Handle direct message
    socket.on('directMessage', async (data) => {
      try {
        const message = new Message({
          content: data.content,
          sender: userId,
          recipient: data.recipientId,
          messageType: data.messageType || 'text'
        });
        
        await message.save();
        await message.populate('sender', 'username avatar');
        
        // Send to recipient if online
        const recipientSocketId = userSockets.get(data.recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('directMessage', message);
        }
        
        // Create notification
        const notification = new Notification({
          user: data.recipientId,
          type: 'message',
          title: 'New Message',
          message: `You have a new message from a user`,
          sender: userId
        });
        await notification.save();
        
        // Send notification
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('notification', notification);
        }
      } catch (error) {
        console.error('Error saving direct message:', error);
      }
    });
    
    // Handle typing indicator
    socket.on('typing', (data) => {
      if (data.roomId) {
        io.to(`room-${data.roomId}`).emit('userTyping', {
          userId,
          roomId: data.roomId
        });
      } else if (data.recipientId) {
        const recipientSocketId = userSockets.get(data.recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('userTyping', { userId });
        }
      }
    });
    
    // Handle stop typing
    socket.on('stopTyping', (data) => {
      if (data.roomId) {
        io.to(`room-${data.roomId}`).emit('userStopTyping', { userId });
      } else if (data.recipientId) {
        const recipientSocketId = userSockets.get(data.recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('userStopTyping', { userId });
        }
      }
    });
    
    // Handle user presence status
    socket.on('setStatus', async (data) => {
      await User.findByIdAndUpdate(userId, { status: data.status });
      io.emit('userStatusChanged', { userId, status: data.status });
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
      userSockets.delete(userId);
      User.findByIdAndUpdate(userId, { status: 'offline', lastSeen: new Date() }).catch(console.error);
      io.emit('userOffline', { userId, timestamp: new Date() });
    });
    
  } catch (error) {
    console.error('Socket authentication error:', error);
    socket.emit('error', { message: 'Authentication failed' });
    socket.disconnect();
  }
};