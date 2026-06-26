import { useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import useChatStore from '../store/chatStore';

export const useChat = () => {
  const { socket } = useSocket();
  const { currentRoom } = useChatStore();

  const joinRoom = useCallback(async (roomId) => {
    if (!socket) return;
    socket.emit('joinRoom', { roomId });
  }, [socket]);

  const sendMessage = useCallback((content, roomId) => {
    if (!socket || !content.trim()) return;
    
    socket.emit('message', {
      content,
      roomId,
      messageType: 'text'
    });
  }, [socket]);

  const sendDirectMessage = useCallback((content, recipientId) => {
    if (!socket || !content.trim()) return;
    
    socket.emit('directMessage', {
      content,
      recipientId,
      messageType: 'text'
    });
  }, [socket]);

  const startTyping = useCallback((roomId) => {
    if (!socket) return;
    socket.emit('typing', { roomId });
  }, [socket]);

  const stopTyping = useCallback((roomId) => {
    if (!socket) return;
    socket.emit('stopTyping', { roomId });
  }, [socket]);

  return {
    joinRoom,
    sendMessage,
    sendDirectMessage,
    startTyping,
    stopTyping
  };
};