import { useEffect } from 'react';
import useChatStore from '../store/chatStore';

const UsersList = () => {
  const { users, onlineUsers } = useChatStore();

  return (
    <div className="space-y-2 p-2">
      {users.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          No users available
        </div>
      ) : (
        users.map((user) => (
          <button
            key={user._id}
            className="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  onlineUsers.has(user._id) ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{user.username}</p>
                <p className="text-xs text-gray-500">
                  {onlineUsers.has(user._id) ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default UsersList;
