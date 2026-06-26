import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Users, MessageCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useChatStore from '../store/chatStore';
import { useSocket } from '../context/SocketContext';
import { chatAPI } from '../api/client';
import ChatWindow from '../components/ChatWindow';
import UsersList from '../components/UsersList';
import RoomsList from '../components/RoomsList';
import CreateRoomModal from '../components/CreateRoomModal';
import NotificationCenter from '../components/NotificationCenter';

const Chat = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { rooms, currentRoom, setRooms, setCurrentRoom, setMessages, setUsers } = useChatStore();
  const { socket, isConnected } = useSocket();
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [activeTab, setActiveTab] = useState('rooms'); // rooms, users, direct
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [roomsRes, usersRes] = await Promise.all([
          chatAPI.getRooms(),
          chatAPI.getUsers()
        ]);
        setRooms(roomsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [setRooms, setUsers]);

  const handleSelectRoom = async (room) => {
    setCurrentRoom(room);
    setActiveTab('rooms');
    try {
      const messagesRes = await chatAPI.getRoomMessages(room._id);
      setMessages(messagesRes.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col border-r border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="text-purple-600" size={24} />
              </div>
              <div>
                <h1 className="font-bold text-lg">ChatHub</h1>
                <div className="flex items-center gap-1 text-xs">
                  <div className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full border-2 border-purple-600"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{user.username}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
              activeTab === 'rooms'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MessageCircle size={16} className="inline mr-2" />
            Rooms
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users size={16} className="inline mr-2" />
            Users
          </button>
        </div>

        {/* Create Room Button */}
        {activeTab === 'rooms' && (
          <button
            onClick={() => setShowCreateRoom(true)}
            className="m-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            New Room
          </button>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : activeTab === 'rooms' ? (
            <RoomsList rooms={rooms} onSelectRoom={handleSelectRoom} selectedRoom={currentRoom} />
          ) : (
            <UsersList />
          )}
        </div>

        {/* Notifications */}
        <NotificationCenter />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentRoom ? (
          <ChatWindow room={currentRoom} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Select a room to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Create Room Modal */}
      {showCreateRoom && (
        <CreateRoomModal onClose={() => setShowCreateRoom(false)} />
      )}
    </div>
  );
};

export default Chat;
