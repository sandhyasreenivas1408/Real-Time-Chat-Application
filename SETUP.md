# Installation & Setup Guide

## System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MongoDB**: v4.0 or higher (local or Atlas)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge
- **RAM**: Minimum 2GB
- **Disk Space**: Minimum 500MB

## Detailed Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/sandhyasreenivas1408/Real-Time-Chat-Application.git
cd Real-Time-Chat-Application
```

### 2. MongoDB Setup

#### Local Installation

**Windows:**
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Install MongoDB as a Service"
4. MongoDB will start automatically

**macOS (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
apt-get update
apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Cloud Installation (MongoDB Atlas)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free tier cluster
3. Create a database user
4. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`)
5. Update `MONGODB_URI` in `.env`

### 3. Environment Variables

**Backend Configuration**

Create `.env` file in root directory:

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/chat-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

**Frontend Configuration**

Create `.env` file in `client/` directory:

```bash
cp client/.env.example client/.env
```

Edit `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

### 4. Install Dependencies

**All at once:**
```bash
npm run install-all
```

**Or separately:**

Backend:
```bash
npm install
```

Frontend:
```bash
cd client
npm install
cd ..
```

### 5. Verify Installation

```bash
# Check Node.js version
node --version  # Should be v14.0.0 or higher

# Check npm version
npm --version   # Should be v6.0.0 or higher

# Test MongoDB connection
mongosh  # or mongo
# Type: exit

# List installed dependencies
npm list
```

### 6. Start the Application

**Development Mode (Both Frontend and Backend):**
```bash
npm run dev
```

**Backend Only:**
```bash
npm start
# or with auto-reload:
npm run dev
```

**Frontend Only:**
```bash
cd client
npm run dev
cd ..
```

### 7. Access the Application

- **Frontend (Client)**: http://localhost:3000
- **Backend (Server)**: http://localhost:3001
- **API Base**: http://localhost:3001/api

## Configuration Details

### Environment Variables Reference

#### Backend (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3001 | Server port |
| `NODE_ENV` | development | Environment (development/production) |
| `MONGODB_URI` | mongodb://localhost:27017/chat-app | MongoDB connection string |
| `JWT_SECRET` | - | Secret key for JWT tokens (CHANGE THIS!) |
| `CLIENT_URL` | http://localhost:3000 | Frontend URL for CORS |

#### Frontend (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | http://localhost:3001/api | Backend API base URL |
| `VITE_SOCKET_URL` | http://localhost:3001 | Socket.IO server URL |

## Docker Installation

### Prerequisites
- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose (usually included with Docker Desktop)

### Steps

```bash
# Clone repository
git clone https://github.com/sandhyasreenivas1408/Real-Time-Chat-Application.git
cd Real-Time-Chat-Application

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up -d --build
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: localhost:27017

## Troubleshooting

### Node.js Issues

**Problem:** `Node.js not found`
```bash
# Solution: Install from https://nodejs.org/
# Or using Homebrew (macOS):
brew install node

# Or using apt (Linux):
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### MongoDB Issues

**Problem:** `connect ECONNREFUSED 127.0.0.1:27017`
```bash
# Solution: Start MongoDB
mongod  # for local installation

# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod
```

**Problem:** `MongoNetworkError: connection refused`
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Issues

**Problem:** `EADDRINUSE: address already in use :::3001`
```bash
# Find process using port 3001
# On macOS/Linux:
lsof -i :3001
# On Windows:
netstat -ano | findstr :3001

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in .env
PORT=3002
```

### Dependencies Issues

**Problem:** `npm ERR! Cannot find module`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For frontend:
cd client
rm -rf node_modules package-lock.json
npm install
```

**Problem:** `CONFLICTS: peer dependency`
```bash
# Use npm's legacy peer deps flag
npm install --legacy-peer-deps
```

### Socket.IO Issues

**Problem:** `Socket.IO connection failed`
1. Ensure backend is running
2. Check CORS configuration
3. Verify `VITE_SOCKET_URL` in frontend `.env`
4. Check browser console for errors (F12)
5. Verify firewall settings

### Browser Issues

**Problem:** `Blank page or stuck on loading`
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. Check browser console (F12) for errors
4. Try different browser

## Database Management

### Using MongoDB Compass (GUI)

1. Download from https://www.mongodb.com/try/download/compass
2. Connect to `mongodb://localhost:27017`
3. Browse collections
4. View, edit, delete documents

### Using MongoDB Shell

```bash
# Connect
mongosh

# List databases
show dbs

# Use chat-app database
use chat-app

# List collections
show collections

# View users
db.users.find()

# View messages
db.messages.find()

# Delete all data (careful!)
db.dropDatabase()

# Exit
exit
```

## Performance Optimization

### For Development
- Use `npm run dev` for hot reloading
- Open DevTools (F12) to check performance
- Monitor network tab for API calls

### For Production
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Enable MongoDB authentication
- Use environment-specific `.env` files
- Enable HTTPS
- Setup proper CORS

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use MongoDB Atlas with password authentication
- [ ] Enable HTTPS in production
- [ ] Setup proper CORS settings
- [ ] Validate all user inputs
- [ ] Use environment variables for sensitive data
- [ ] Enable rate limiting
- [ ] Setup security headers
- [ ] Regular security updates

## Next Steps

1. Read [README.md](README.md) for full documentation
2. Check [QUICKSTART.md](QUICKSTART.md) for quick start
3. Review [API endpoints](README.md#api-endpoints)
4. Explore [Socket.IO events](README.md#socket-events)
5. Start developing!

## Support

For issues or questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/sandhyasreenivas1408/Real-Time-Chat-Application/issues)
3. Create new issue with detailed information
4. Include:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, etc.)
   - Screenshot if applicable

---

**Installation complete! Happy coding! 🎉**
