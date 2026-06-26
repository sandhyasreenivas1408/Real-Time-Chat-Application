import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import useChatStore from '../store/chatStore';
import { chatAPI } from '../api/client';

const RoomsList = ({ rooms, onSelectRoom, selectedRoom }) => {
  const { currentRoom } = useChatStore();

  const handleJoinRoom = async (room) => {
    try {
      await chatAPI.joinRoom(room._id);
      onSelectRoom(room);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <div className="space-y-2 p-2">
      {rooms.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          No rooms available
        </div>
      ) : (
        rooms.map((room) => (
          <button
            key={room._id}
            onClick={() => handleJoinRoom(room)}
            className={`w-full text-left p-3 rounded-lg transition-all hover:bg-purple-50 ${
              selectedRoom?._id === room._id
                ? 'bg-purple-100 border-l-4 border-purple-600'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
                {room.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{room.name}</p>
                <p className="text-xs text-gray-500 truncate">{room.description}</p>
              </div>
              <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {room.members.length}
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default RoomsList;
