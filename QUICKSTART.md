# Quick Start Guide

## Prerequisites
- Node.js 14+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

## Option 1: Quick Local Setup (Recommended for Development)

### Step 1: Clone the Repository
```bash
git clone https://github.com/sandhyasreenivas1408/Real-Time-Chat-Application.git
cd Real-Time-Chat-Application
```

### Step 2: Setup MongoDB

**Option A: Using Local MongoDB**
```bash
# On macOS (with Homebrew)
brew services start mongodb-community

# On Windows
# Download and install MongoDB from https://www.mongodb.com/try/download/community
# Or use MongoDB Compass GUI

# On Linux
sudo systemctl start mongod
```

**Option B: Using MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### Step 3: Setup Environment Variables

**Backend (.env)**
```bash
cp .env.example .env
```

Edit `.env` and update:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_super_secret_key_here_change_this
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Frontend (client/.env)**
```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

### Step 4: Install Dependencies

**Backend**
```bash
npm install
```

**Frontend**
```bash
cd client
npm install
cd ..
```

Or install both at once:
```bash
npm run install-all
```

### Step 5: Start the Application

**Option A: Run both in one command**
```bash
npm run dev
```
This starts both backend (port 3001) and frontend (port 3000) simultaneously.

**Option B: Run in separate terminals**

Terminal 1 - Backend:
```bash
npm start
# or with auto-reload:
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

### Step 6: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

## Option 2: Docker Setup

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

```bash
# Clone the repository
git clone https://github.com/sandhyasreenivas1408/Real-Time-Chat-Application.git
cd Real-Time-Chat-Application

# Start all services
docker-compose up -d

# Wait for containers to be ready (about 30 seconds)
docker-compose logs -f

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001

# To stop:
docker-compose down
```

## Creating Your First Account

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in:
   - Username: Choose a unique username
   - Email: Your email address
   - Password: At least 6 characters
4. Click "Register"
5. You'll be logged in automatically

## Creating a Chat Room

1. Click "New Room" button in the sidebar
2. Enter:
   - **Room Name**: e.g., "General Discussion"
   - **Description**: Optional description
   - **Privacy**: Check to make it private
3. Click "Create Room"
4. Start chatting!

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Check if MongoDB is running
mongosh  # or mongo

# If not, start it
mongod  # for local MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE :::3001
```
**Solution**: Kill the process using the port
```bash
# For Linux/Mac
lsof -i :3001
kill -9 <PID>

# For Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Socket.IO Connection Error
- Make sure backend is running on port 3001
- Check browser console (F12) for detailed errors
- Verify CORS settings in backend

### Cannot Login
- Double-check email and password
- Ensure MongoDB has the user data (check in MongoDB Compass)
- Clear browser localStorage and try again

## Development Tips

### Enable Debug Logging

Add to `.env`:
```
DEBUG=*
```

### Use MongoDB Compass (GUI)

1. Download from https://www.mongodb.com/try/download/compass
2. Connect to `mongodb://localhost:27017`
3. View collections and data in real-time

### Test with Multiple Users

1. Open application in different browsers/tabs
2. Create different accounts
3. Test messaging in real-time
4. Check typing indicators and presence

### Common Development Tasks

```bash
# Reset database (remove all data)
# In MongoDB Compass: Right-click database > Delete Database
# Or via command line:
mongosh
use chat-app
db.users.deleteMany({})
db.chatrooms.deleteMany({})
db.messages.deleteMany({})
exit

# View all dependencies
npm list

# Update dependencies (cautiously)
npm update

# Check for outdated packages
npm outdated
```

## Production Deployment

### Backend Deployment (Heroku/Railway)

```bash
# Set environment variables on hosting platform:
# PORT=3001
# MONGODB_URI=<your-atlas-uri>
# JWT_SECRET=<strong-secret-key>
# CLIENT_URL=<your-frontend-url>
# NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

```bash
cd client

# Build
npm run build

# Deploy to Vercel
npm i -g vercel
vercel

# Or deploy to Netlify
# Connect your GitHub repo to Netlify dashboard
```

## Next Steps

- Read the [full README](README.md) for detailed documentation
- Check [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Review [CHANGELOG.md](CHANGELOG.md) for updates

## Need Help?

- Check existing [Issues](https://github.com/sandhyasreenivas1408/Real-Time-Chat-Application/issues)
- Create a new issue with details
- Read the troubleshooting section above

---

**Happy Chatting! 🚀**
