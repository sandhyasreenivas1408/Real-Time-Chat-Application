import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import useChatStore from '../store/chatStore';

export const useSocketEvents = () => {
  const { socket } = useSocket();
  const {
    addMessage,
    addNotification,
    addOnlineUser,
    removeOnlineUser,
    addTypingUser,
    removeTypingUser,
    setDirectMessage
  } = useChatStore();

  useEffect(() => {
    if (!socket) return;

    // Message events
    socket.on('newMessage', (message) => {
      addMessage(message);
    });

    socket.on('directMessage', (message) => {
      setDirectMessage(message.sender._id, message);
      addNotification({
        type: 'message',
        title: 'New Message',
        sender: message.sender
      });
    });

    // User presence events
    socket.on('userOnline', (data) => {
      addOnlineUser(data.userId);
    });

    socket.on('userOffline', (data) => {
      removeOnlineUser(data.userId);
    });

    socket.on('userStatusChanged', (data) => {
      // Handle status change
    });

    // Typing events
    socket.on('userTyping', (data) => {
      addTypingUser(data.userId);
    });

    socket.on('userStopTyping', (data) => {
      removeTypingUser(data.userId);
    });

    // Notification events
    socket.on('notification', (notification) => {
      addNotification(notification);
    });

    return () => {
      socket.off('newMessage');
      socket.off('directMessage');
      socket.off('userOnline');
      socket.off('userOffline');
      socket.off('userStatusChanged');
      socket.off('userTyping');
      socket.off('userStopTyping');
      socket.off('notification');
    };
  }, [socket]);
};