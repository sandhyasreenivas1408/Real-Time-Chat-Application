# Real-Time Chat Application

A modern, real-time chat application built with WebSocket technology. Users can create accounts, join chat rooms, send direct messages, and enjoy instant messaging with real-time notifications.

## Features

### Core Features
- ✅ **User Authentication**: Register and login with email/password
- ✅ **Chat Rooms**: Create and join public/private chat rooms
- ✅ **Real-time Messaging**: Instant message delivery using WebSocket
- ✅ **Direct Messaging**: One-on-one private conversations
- ✅ **User Presence**: See who's online with real-time status updates
- ✅ **Typing Indicators**: See when other users are typing
- ✅ **Notifications**: Get notified of new messages

### Optional Features
- 🎨 **User Avatars**: Auto-generated avatars for each user
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎯 **Message History**: Persistent chat history
- 🔔 **Desktop Notifications**: Browser notifications for new messages
- ⚡ **Emoji Support**: Rich message formatting

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Socket.IO Client** - WebSocket client
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide Icons** - Icon library

## Project Structure

```
.
├── server.js                 # Express server entry point
├── package.json             # Backend dependencies
├── .env.example            # Environment variables template
├── config/
│   └── database.js         # MongoDB connection
├── models/
│   ├── User.js            # User schema
│   ├── ChatRoom.js        # Chat room schema
│   ├── Message.js         # Message schema
│   └── Notification.js    # Notification schema
├── routes/
│   ├── auth.js            # Authentication routes
│   └── chat.js            # Chat routes
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── socketHandlers/
│   └── index.js           # Socket.IO event handlers
└── client/
    ├── package.json       # Frontend dependencies
    ├── vite.config.js     # Vite configuration
    ├── index.html         # HTML template
    ├── tailwind.config.js # Tailwind configuration
    └── src/
        ├── main.jsx       # React entry point
        ├── App.jsx        # Main app component
        ├── index.css      # Global styles
        ├── pages/
        │   ├── Auth.jsx   # Login/Register page
        │   └── Chat.jsx   # Main chat page
        ├── components/
        │   ├── ChatWindow.jsx        # Chat room window
        │   ├── RoomsList.jsx         # Rooms list
        │   ├── UsersList.jsx         # Users list
        │   ├── CreateRoomModal.jsx   # Room creation modal
        │   └── NotificationCenter.jsx# Notifications
        ├── context/
        │   └── SocketContext.jsx     # Socket.IO context
        ├── store/
        │   ├── authStore.js          # Auth state
        │   └── chatStore.js          # Chat state
        └── api/
            └── client.js             # API client
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Real-Time-Chat-Application
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

5. Start MongoDB:
```bash
mongod
```

6. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser:
```
http://localhost:3000
```

## Usage

### Creating an Account
1. Click "Register" on the login page
2. Enter username, email, and password
3. Click "Register" to create account

### Logging In
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to the chat page

### Creating a Chat Room
1. Click "New Room" button in the sidebar
2. Enter room name and optional description
3. Choose if the room should be private
4. Click "Create Room"

### Joining a Chat Room
1. Select a room from the rooms list
2. Click the room to join and start chatting

### Sending Messages
1. Type your message in the input field
2. Press Enter or click Send
3. Your message appears in real-time for all users in the room

### Direct Messages
1. Go to the "Users" tab
2. Click on a user to start a direct conversation
3. Send messages privately

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Chat
- `GET /api/chat/rooms` - Get all rooms
- `POST /api/chat/rooms` - Create room
- `POST /api/chat/rooms/:roomId/join` - Join room
- `GET /api/chat/rooms/:roomId/messages` - Get room messages
- `GET /api/chat/messages/direct/:userId` - Get direct messages
- `GET /api/chat/users` - Get all users
- `GET /api/chat/notifications` - Get notifications

## Socket Events

### Emitted Events
- `joinRoom` - Join a chat room
- `message` - Send message to room
- `directMessage` - Send direct message
- `typing` - Notify others you're typing
- `stopTyping` - Notify you stopped typing
- `setStatus` - Update user status

### Received Events
- `newMessage` - New message in room
- `directMessage` - New direct message
- `userTyping` - User is typing
- `userStopTyping` - User stopped typing
- `userOnline` - User came online
- `userOffline` - User went offline
- `notification` - New notification

## Configuration

### Environment Variables
```
PORT              - Server port (default: 3001)
MONGODB_URI       - MongoDB connection string
JWT_SECRET        - Secret key for JWT tokens
NODE_ENV          - Environment (development/production)
CLIENT_URL        - Frontend URL for CORS
```

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```

### Backend (Heroku/Railway)
```bash
npm start
```

Make sure to set environment variables in your hosting platform.

## Future Enhancements

- [ ] File/Image sharing
- [ ] Message search functionality
- [ ] User blocking
- [ ] Message reactions/emojis
- [ ] Voice/Video calls
- [ ] Chat rooms with moderation
- [ ] Message encryption
- [ ] Dark mode
- [ ] User profiles
- [ ] Message pinning

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

## Author

Sandhya Sreenivas
