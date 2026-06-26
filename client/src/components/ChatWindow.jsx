import { useEffect, useRef, useState } from 'react';
import { Send, Smile, Clock } from 'lucide-react';
import useChatStore from '../store/chatStore';
import { useSocket } from '../context/SocketContext';
import useAuthStore from '../store/authStore';

const ChatWindow = ({ room }) => {
  const { messages, addMessage, typingUsers } = useChatStore();
  const { socket } = useSocket();
  const { user } = useAuthStore();
  const [messageContent, setMessageContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message) => {
      addMessage(message);
    });

    socket.on('userTyping', (data) => {
      if (data.roomId === room._id) {
        // Handle typing indicator
      }
    });

    socket.on('userStopTyping', (data) => {
      // Handle stop typing
    });

    return () => {
      socket.off('newMessage');
      socket.off('userTyping');
      socket.off('userStopTyping');
    };
  }, [socket, room._id, addMessage]);

  const handleTyping = (e) => {
    setMessageContent(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', { roomId: room._id });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('stopTyping', { roomId: room._id });
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!messageContent.trim() || !socket) return;

    socket.emit('message', {
      content: messageContent,
      roomId: room._id,
      messageType: 'text'
    });

    setMessageContent('');
    setIsTyping(false);
    socket.emit('stopTyping', { roomId: room._id });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{room.name}</h2>
            <p className="text-purple-100 text-sm">{room.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-sm text-purple-100">
                {room.members.length} members
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 animate-fade-in ${
                msg.sender._id === user.id ? 'justify-end' : ''
              }`}
            >
              {msg.sender._id !== user.id && (
                <img
                  src={msg.sender.avatar}
                  alt={msg.sender.username}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender._id === user.id
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }}`}
              >
                {msg.sender._id !== user.id && (
                  <p className="text-xs font-semibold mb-1 opacity-70">
                    {msg.sender.username}
                  </p>
                )}
                <p className="break-words">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        {typingUsers.size > 0 && (
          <div className="flex gap-3 text-gray-500 text-sm italic">
            <Clock size={16} className="animate-spin" />
            Someone is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={messageContent}
            onChange={handleTyping}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            onClick={() => alert('Emoji picker coming soon!')}
            className="p-3 text-gray-500 hover:bg-gray-200 rounded-lg transition"
          >
            <Smile size={20} />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!messageContent.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
