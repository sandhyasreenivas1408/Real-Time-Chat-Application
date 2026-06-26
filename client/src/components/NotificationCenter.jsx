import { useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import useChatStore from '../store/chatStore';
import { chatAPI } from '../api/client';
import { useSocket } from '../context/SocketContext';

const NotificationCenter = () => {
  const { notifications, addNotification } = useChatStore();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const loadNotifications = async () => {
      try {
        const response = await chatAPI.getNotifications();
        // Handle loading notifications
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();

    socket.on('notification', (notification) => {
      addNotification(notification);
    });

    return () => {
      socket.off('notification');
    };
  }, [socket, addNotification]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Notifications</span>
        </div>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
